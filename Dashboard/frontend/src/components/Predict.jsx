import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLastWatchlist, onSocket } from '../socket';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Predict = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      const list = getLastWatchlist() || [];
      setWatchlist(list);
      if (list.length > 0) setSelectedStock(list[0].symbol);
      setLoading(false);
    };
    fetchWatchlist();
    const off = onSocket('watchlist', (data) => {
      setWatchlist(data || []);
      if (!selectedStock && data?.length) setSelectedStock(data[0].symbol);
    });
    return () => off();
  }, []);

  useEffect(() => {
    if (!selectedStock) return;

    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setError("");
        setPredictionData(null);

        const statuses = [
          "Downloading historical market data from Yahoo Finance...",
          "Calculating 100-day & 200-day Moving Averages...",
          "Loading pre-trained Gated Recurrent Unit (GRU) Neural Network...",
          "Generating tomorrow's price forecast...",
        ];
        
        let statusIdx = 0;
        setLoadingStatus(statuses[statusIdx]);
        const interval = setInterval(() => {
          if (statusIdx < statuses.length - 1) {
            statusIdx++;
            setLoadingStatus(statuses[statusIdx]);
          }
        }, 800);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/predict/${selectedStock}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        clearInterval(interval);
        
        if (res.data.success) {
          setPredictionData(res.data);
        } else {
          setError(res.data.error || "Failed to generate prediction.");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Error running the prediction model. Make sure Keras dependencies are installed.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedStock]);

  if (watchlist.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4 p-6 bg-[var(--bg-card)] rounded-lg shadow-sm border border-[var(--border-color)] max-w-2xl mx-auto mt-10">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full text-red-500">
          <ShowChartIcon className="text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">Watchlist is Empty</h3>
        <p className="text-[var(--text-muted)] text-center max-w-md">
          Deep learning predictions are based on stocks in your watchlist. Add instruments to your watchlist in the sidebar to get started!
        </p>
      </div>
    );
  }

  const chartData = predictionData ? {
    labels: predictionData.dates,
    datasets: [
      {
        label: "Actual Close",
        data: predictionData.actual,
        borderColor: "rgba(59, 130, 246, 1)", 
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 1,
        tension: 0.1,
      },
      {
        label: "GRU Predicted Close",
        data: predictionData.predicted,
        borderColor: "rgba(239, 68, 68, 1)",
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
      {
        label: "MA 100",
        data: predictionData.ma100,
        borderColor: "rgba(245, 158, 11, 0.6)", 
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.1,
      },
      {
        label: "MA 200",
        data: predictionData.ma200,
        borderColor: "rgba(139, 92, 246, 0.6)", 
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 12 },
          color: 'var(--text-primary)',
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#ccc',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 8, font: { size: 10 }, color: 'var(--text-muted)' },
      },
      y: {
        grid: { color: "var(--border-color)" },
        ticks: { font: { size: 10 }, color: 'var(--text-muted)' },
      },
    },
  };

  const isUp = predictionData ? predictionData.tomorrowPredicted > predictionData.currentPrice : false;
  const changeAmt = predictionData ? predictionData.tomorrowPredicted - predictionData.currentPrice : 0;
  const changePct = predictionData ? (changeAmt / predictionData.currentPrice) * 100 : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full p-4 lg:p-6 h-full">
      <div className="flex-1 bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col min-w-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-6">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[var(--text-secondary)] font-medium text-sm animate-pulse text-center max-w-xs">{loadingStatus}</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-4 p-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full text-red-500">
              <WarningAmberIcon className="text-3xl" />
            </div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Prediction Model Error</h4>
            <p className="text-[var(--text-muted)] max-w-md text-sm">{error}</p>
            <button 
              onClick={() => setSelectedStock(selectedStock)} 
              className="mt-2 bg-[var(--accent)] text-white px-5 py-2 text-sm rounded-lg hover:bg-[var(--accent-hover)] transition-colors cursor-pointer font-medium shadow-sm"
            >
              Retry Prediction
            </button>
          </div>
        ) : predictionData ? (
          <div className="flex flex-col h-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-color)] pb-4 mb-4 gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  {predictionData.symbol}
                  <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded uppercase border border-blue-100 dark:border-blue-800">
                    AI Forecast
                  </span>
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">Symbol: {predictionData.ticker}</p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[0.65rem] text-[var(--text-muted)] uppercase font-bold tracking-wider">Today's Close</p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">₹{predictionData.currentPrice.toLocaleString("en-IN")}</p>
                </div>
                
                <div className="h-8 w-px bg-[var(--border-color)]"></div>

                <div>
                  <p className="text-[0.65rem] text-[var(--text-muted)] uppercase font-bold tracking-wider">Tomorrow</p>
                  <div className="flex items-center gap-1.5">
                    <p className={`text-lg font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                      ₹{predictionData.tomorrowPredicted.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <span className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${isUp ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"}`}>
                      {isUp ? <ArrowUpwardIcon style={{ fontSize: 12 }} /> : <ArrowDownwardIcon style={{ fontSize: 12 }} />}
                      {Math.abs(changePct).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast Callout Box */}
            <div className={`mb-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm transition-colors ${
              isUp 
                ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-400" 
                : "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-400"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full flex-shrink-0 ${isUp ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-red-100 dark:bg-red-900/30 text-red-500"}`}>
                  {isUp ? <ArrowUpwardIcon style={{ fontSize: 28 }} /> : <ArrowDownwardIcon style={{ fontSize: 28 }} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-[var(--text-primary)]">
                    Model Forecast: Price is expected to go {isUp ? "UP" : "DOWN"} tomorrow
                  </h4>
                  <p className="text-xs mt-1 text-[var(--text-secondary)]">
                    Predicted change: {isUp ? "+" : ""}{changeAmt.toFixed(2)} ({isUp ? "+" : ""}{changePct.toFixed(2)}%) compared to today's close price of ₹{predictionData.currentPrice.toLocaleString("en-IN")}.
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-[380px] w-full min-w-0 relative mt-2 bg-[var(--bg-primary)] rounded-lg p-2 border border-[var(--border-color)]">
              <Line options={chartOptions} data={chartData} />
            </div>

            {/* Disclaimer Alert */}
            <div className="mt-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 flex gap-3 text-amber-800 dark:text-amber-400/80">
              <WarningAmberIcon className="text-amber-500 flex-shrink-0" style={{ fontSize: 20 }} />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block mb-1">Deep Learning Stock Market Disclaimer:</span>
                Predictions are generated by a pre-trained GRU neural network. These predictions are for informational and simulation purposes only and do NOT constitute professional investment advice. TradeNest and its developers are not responsible for any financial losses or investment decisions made using this model.
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[500px]">
            <p className="text-[var(--text-muted)] text-sm">Select a stock to load forecasting chart.</p>
          </div>
        )}
      </div>

      {/* Watchlist Quick Selection Sidebar */}
      <div className="w-full lg:w-[280px] bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col h-fit">
        <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3 mb-3">Watchlist Predictor</h3>
        <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-1">
          {watchlist.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => setSelectedStock(stock.symbol)}
              disabled={loading}
              className={`flex justify-between items-center px-3 py-3 rounded-lg border text-left cursor-pointer transition-all duration-200
                ${selectedStock === stock.symbol 
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 shadow-sm" 
                  : "bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)]"
                }
              `}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{stock.symbol}</span>
                <span className="text-[10px] text-[var(--text-muted)] mt-0.5">LTP: ₹{stock.curr}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stock.change < 0 ? "bg-red-50 dark:bg-red-900/20 text-red-500" : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"}`}>
                {stock.change}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Predict;
