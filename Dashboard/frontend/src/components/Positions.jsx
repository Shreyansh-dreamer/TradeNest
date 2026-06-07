import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/allPositions`).then((res) => {
      setAllPositions(res.data);
    });
  }, []);

  if (allPositions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-4 text-[var(--text-primary)]">
        <h3 className="text-xl font-semibold mb-2">
          You have no open Positions.
        </h3>
        <p className="text-[var(--text-muted)] text-center mb-6">
          Positions appear here once you place intraday or F&O orders.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Positions ({allPositions.length})</h3>

      <div className="overflow-x-auto w-full max-w-full rounded-lg border border-[var(--border-color)] shadow-sm bg-[var(--bg-card)]">
        <table className="min-w-max w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Instrument</th>
              <th className="px-4 py-3 font-medium">Qty.</th>
              <th className="px-4 py-3 font-medium">Avg.</th>
              <th className="px-4 py-3 font-medium">LTP</th>
              <th className="px-4 py-3 font-medium">P&amp;L</th>
              <th className="px-4 py-3 font-medium">Chg.</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--text-secondary)]">
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "text-green-500" : "text-red-500";
              const dayClass = stock.isLoss ? "text-red-500" : "text-green-500";

              return (
                <tr key={index} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-muted)]">{stock.product}</td>
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{stock.name}</td>
                  <td className="px-4 py-3">{stock.qty}</td>
                  <td className="px-4 py-3">{stock.avg.toFixed(2)}</td>
                  <td className="px-4 py-3">{stock.price.toFixed(2)}</td>
                  <td className={`px-4 py-3 font-medium ${profClass}`}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={`px-4 py-3 ${dayClass}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
