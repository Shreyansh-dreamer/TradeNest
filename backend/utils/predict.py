import sys
import json
import os
import datetime
os.environ["KERAS_BACKEND"] = "tensorflow"

try:
    import numpy as np
    import pandas as pd
    import yfinance as yf
    from sklearn.preprocessing import MinMaxScaler
    from keras.models import load_model
except ImportError as e:
    print(json.dumps({"success": False, "error": f"Missing python dependency: {str(e)}"}))
    sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No stock symbol provided."}))
        sys.exit(1)
    symbol = sys.argv[1].strip()
    start_date = "2015-01-01"
    end_date = datetime.datetime.now().strftime("%Y-%m-%d")
    try:
        df = yf.download(ticker, start=start_date, end=end_date, progress=False)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Failed to download data from yfinance: {str(e)}"}))
        sys.exit(1)
    if df.empty:
        if ticker.endswith(".NS"):
            try:
                ticker = symbol
                df = yf.download(ticker, start=start_date, end=end_date, progress=False)
            except Exception as e:
                pass

    if df.empty:
        print(json.dumps({"success": False, "error": f"No historical data found for symbol '{symbol}'."}))
        sys.exit(1)

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [col[0] for col in df.columns]

    if "Close" not in df.columns:
        print(json.dumps({"success": False, "error": "Close price column not found in downloaded data."}))
        sys.exit(1)

    df = df.dropna(subset=["Close"])

    if len(df) < 101:
        print(json.dumps({"success": False, "error": f"Insufficient data for symbol '{symbol}'. Need at least 101 data points, found {len(df)}."}))
        sys.exit(1)

    df["MA100"] = df["Close"].rolling(100).mean()
    df["MA200"] = df["Close"].rolling(200).mean()

    close_prices = df["Close"].values
    dates = df.index.strftime("%Y-%m-%d").tolist()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.abspath(os.path.join(script_dir, "../../models/Stock_Prediction(GRU).keras"))

    if not os.path.exists(model_path):
        print(json.dumps({"success": False, "error": f"Pre-trained GRU model file not found at path: {model_path}"}))
        sys.exit(1)

    try:
        model = load_model(model_path)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Failed to load Keras model: {str(e)}"}))
        sys.exit(1)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(close_prices.reshape(-1, 1))

    N = min(100, len(scaled_data) - 100)
    
    if N <= 0:
        print(json.dumps({"success": False, "error": "Not enough data to calculate sliding window predictions."}))
        sys.exit(1)

    x_predict = []
    for i in range(len(scaled_data) - N, len(scaled_data) + 1):
        x_predict.append(scaled_data[i - 100:i])

    x_predict = np.array(x_predict) 

    try:
        y_pred_scaled = model.predict(x_predict, verbose=0) 
        y_pred = scaler.inverse_transform(y_pred_scaled) 
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Model prediction error: {str(e)}"}))
        sys.exit(1)

    predicted_history = y_pred[:-1].flatten().tolist()
    tomorrow_predicted = float(y_pred[-1][0])

    actual_history = close_prices[-N:].flatten().tolist()
    dates_history = dates[-N:]

    ma100_history = df["MA100"].iloc[-N:].values
    ma200_history = df["MA200"].iloc[-N:].values

    ma100_list = [float(x) if pd.notnull(x) else None for x in ma100_history]
    ma200_list = [float(x) if pd.notnull(x) else None for x in ma200_history]

    current_price = float(actual_history[-1])

    output = {
        "success": True,
        "symbol": symbol,
        "ticker": ticker,
        "currentPrice": current_price,
        "tomorrowPredicted": tomorrow_predicted,
        "dates": dates_history,
        "actual": actual_history,
        "predicted": predicted_history,
        "ma100": ma100_list,
        "ma200": ma200_list
    }

    print(json.dumps(output))

if __name__ == "__main__":
    main()
