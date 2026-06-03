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
    
    # Download stock data
    try:
        df = yf.download(symbol, start=start_date, end=end_date, progress=False)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Failed to download data from yfinance: {str(e)}"}))
        sys.exit(1)

    if df.empty:
        print(json.dumps({"success": False, "error": f"No historical data found for symbol '{symbol}'."}))
        sys.exit(1)

    # Handle MultiIndex columns
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [col[0] for col in df.columns]

    if "Close" not in df.columns or "Volume" not in df.columns:
        print(json.dumps({"success": False, "error": "Close or Volume column not found in downloaded data."}))
        sys.exit(1)

    # Reset index to have Date as a column
    df.reset_index(inplace=True)
    
    # Calculate Close percentage change
    df["Close_Pct"] = df["Close"].pct_change()
    
    # Select features: Close_Pct, Volume, Close
    features = ["Close_Pct", "Volume", "Close"]
    data_filtered = df[features].copy()
    data_filtered.dropna(inplace=True)

    if len(data_filtered) < 199:  # Need at least 99 + 100 days for training and prediction
        print(json.dumps({"success": False, "error": f"Insufficient data for symbol '{symbol}'. Need at least 199 data points, found {len(data_filtered)}."}))
        sys.exit(1)

    # Initialize scalers
    scaler_pct = MinMaxScaler()
    scaler_vol = MinMaxScaler()

    # Fit scalers on all data
    all_pct_scaled = scaler_pct.fit_transform(data_filtered[["Close_Pct"]])
    all_vol_scaled = scaler_vol.fit_transform(data_filtered[["Volume"]])

    # Load LSTM model
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.abspath(os.path.join(script_dir, "../../models/Prediction model(LSTM).keras"))

    if not os.path.exists(model_path):
        print(json.dumps({"success": False, "error": f"Pre-trained LSTM model file not found at path: {model_path}"}))
        sys.exit(1)

    try:
        model = load_model(model_path)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Failed to load Keras model: {str(e)}"}))
        sys.exit(1)

    # Prepare data for prediction (last 99 days)
    data_scaled = np.hstack((all_pct_scaled, all_vol_scaled))
    
    # Number of days to show predictions for
    N = min(100, len(data_scaled) - 99)
    
    if N <= 0:
        print(json.dumps({"success": False, "error": "Not enough data to calculate predictions."}))
        sys.exit(1)

    # Create prediction sequences (99-day windows)
    x_predict = []
    for i in range(len(data_scaled) - N, len(data_scaled)):
        if i >= 99:
            x_predict.append(data_scaled[i - 99:i])

    if not x_predict:
        print(json.dumps({"success": False, "error": "Not enough data to create prediction sequences."}))
        sys.exit(1)
    
    x_predict = np.array(x_predict)

    # Make predictions
    try:
        y_pred_scaled = model.predict(x_predict, verbose=0)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Model prediction error: {str(e)}"}))
        sys.exit(1)

    # Inverse transform predictions (convert from scaled percentage change back to percentage change)
    y_pred_pct = scaler_pct.inverse_transform(y_pred_scaled).flatten()

    # Convert percentage changes to actual prices
    actual_prices = data_filtered["Close"].values
    predicted_history = []
    
    for i in range(len(y_pred_pct)):
        if i == 0:
            prev_price = actual_prices[-(N + 1)]
        else:
            prev_price = actual_prices[-(N - i)]
        predicted_price = prev_price * (1 + y_pred_pct[i])
        predicted_history.append(predicted_price)

    tomorrow_predicted = float(predicted_history[-1])
    actual_history = actual_prices[-N:].tolist()
    
    # Get dates
    dates_df = df.iloc[-N:]["Date"]
    dates_history = [str(d.date()) if hasattr(d, 'date') else str(d) for d in dates_df]

    # Calculate moving averages for additional context
    close_prices_full = df["Close"].values
    ma100_history = close_prices_full[-N:]
    
    ma100_list = [float(x) for x in ma100_history]

    current_price = float(actual_history[-1])

    output = {
        "success": True,
        "symbol": symbol,
        "currentPrice": current_price,
        "tomorrowPredicted": tomorrow_predicted,
        "dates": dates_history,
        "actual": actual_history,
        "predicted": predicted_history,
        "ma100": ma100_list,
    }

    print(json.dumps(output))

if __name__ == "__main__":
    main()

