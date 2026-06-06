import axios from "axios";
import { useState, useEffect } from "react";

const getTotalHoldingsValue = (holdings) =>
  holdings.reduce((total, stock) => total + stock.price * stock.qty, 0);

const getTotalInvestment = (holdings) =>
  holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);

const Summary = ({ allHoldings }) => {
  const [allData, setAllData] = useState({});
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);

  useEffect(() => {
    setTotalHoldingsValue(getTotalHoldingsValue(allHoldings));
  }, [allHoldings]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/userData", {
        withCredentials: true,
      })
      .then((res) => {
        setAllData(res.data);
      });
  }, []);

  const totalInvestment = getTotalInvestment(allHoldings);
  const equity = totalHoldingsValue + (allData.availableMargin || 0);
  const pnl = totalHoldingsValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  return (
    <div className="w-full p-4">
      {/* User Greeting */}
      <div className="mb-5">
        <h6 className="text-lg font-semibold text-[var(--text-primary)]">
          Welcome back, {allData.username || "—"}
        </h6>
        <hr className="my-3 border-[var(--border-color)]" />
      </div>

      {/* Equity Section */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Equity Overview</p>
        <div className="bg-[var(--bg-card)] p-4 rounded-lg border border-[var(--border-color)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">₹{equity.toFixed(2)}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">Total Equity</p>
            </div>

            <div className="flex flex-col text-sm text-[var(--text-secondary)] gap-1">
              <p>
                Available margin{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  ₹{allData.availableMargin || 0}
                </span>
              </p>
              <p>
                Margins used{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  ₹{allData.marginsUsed || 0}
                </span>
              </p>
              <p>
                Opening balance{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  ₹{allData.openingBalance || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 border-[var(--border-color)]" />
      </div>

      {/* Holdings Section */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Holdings ({allHoldings.length})
        </p>

        <div className="bg-[var(--bg-card)] p-4 rounded-lg border border-[var(--border-color)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">₹{totalHoldingsValue.toFixed(2)}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">Current Market Value</p>
            </div>

            <div className="flex flex-col text-sm text-[var(--text-secondary)] gap-1">
              <p>
                Invested{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  ₹{totalInvestment.toFixed(2)}
                </span>
              </p>
              <p>
                P&L{" "}
                <span className={`font-semibold ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)
                </span>
              </p>
              <p>
                Avg. per stock{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  ₹{allHoldings.length > 0
                    ? (totalInvestment / allHoldings.length).toFixed(2)
                    : 0}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 border-[var(--border-color)]" />
      </div>
    </div>
  );
};

export default Summary;
