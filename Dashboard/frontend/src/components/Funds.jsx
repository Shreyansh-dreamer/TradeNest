import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(0);
  const [payin, setPayin] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [usedMargin, setUsedMargin] = useState(0);
  const [deliveryMargin, setDeliveryMargin] = useState(0);
  const [allData, setAllData] = useState({});
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/userData`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllData(res.data);
        setAvailableMargin(Number(res.data.available_margin ?? res.data.availableMargin) || 0);
        setUsedMargin(Number(res.data.used_margin ?? res.data.usedMargin) || 0);
        setPayin(Number(res.data.payin) || 0);
        setOpeningBalance(Number(res.data.opening_balance ?? res.data.openingBalance) || 0);
      });
  }, []);

  useEffect(() => {
    setDeliveryMargin((availableMargin * 0.05).toFixed(2));
  }, [availableMargin]);

  const handleAddFunds = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/addFunds`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          setAvailableMargin(prev => Number(res.data.available_margin ?? res.data.availableMargin ?? prev));
          setPayin(res.data.payin);
          if (openingBalance === 0) setOpeningBalance(amount);
          setAddAmount("");
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Error adding funds");
        });
    } else {
      alert("Please enter a valid positive amount to add.");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= availableMargin) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/withdrawFunds`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          setAvailableMargin(Number(res.data.available_margin) || 0);
          setPayin(res.data.payin);
          setWithdrawAmount("");
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Error withdrawing funds");
        });
    } else {
      alert("Invalid or insufficient amount.");
    }
  };

  const availableCash = availableMargin-usedMargin;

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-6">
      
      {/* Top Action Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="text-sm text-[var(--text-secondary)] text-center sm:text-left">
          Instant, zero-cost fund transfers with UPI
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 w-full md:w-auto">
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="number"
              placeholder="Add amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none px-4 py-2 rounded-lg text-sm w-full sm:w-32 transition-colors"
            />
            <button
              onClick={handleAddFunds}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Add Funds
            </button>
          </div>

          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="number"
              placeholder="Withdraw amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none px-4 py-2 rounded-lg text-sm w-full sm:w-36 transition-colors"
            />
            <button
              onClick={handleWithdraw}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Equity Section */}
        <div className="flex-1 space-y-4 bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pb-2 border-b border-[var(--border-color)]">Equity</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm text-[var(--text-secondary)] gap-x-12 mt-4">
            <div className="flex justify-between items-center">
              <span>Available margin</span>
              <span className="text-2xl text-[var(--text-primary)] font-semibold">
                {Number(availableMargin).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Used margin</span>
              <span className="text-2xl text-[var(--text-primary)] font-semibold">{usedMargin}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Available cash</span>
              <span className="text-2xl text-[var(--text-primary)] font-semibold">{availableCash.toFixed(2)}</span>
            </div>

            <div className="col-span-full border-t border-[var(--border-color)] my-2" />

            <div className="flex justify-between">
              <span>Opening Balance</span>
              <span className="text-[var(--text-primary)] font-medium">{openingBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Payin</span>
              <span className="text-[var(--text-primary)] font-medium">{Number(payin).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SPAN</span>
              <span className="text-[var(--text-primary)] font-medium">0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery margin</span>
              <span className="text-[var(--text-primary)] font-medium">{deliveryMargin}</span>
            </div>
            <div className="flex justify-between">
              <span>Exposure</span>
              <span className="text-[var(--text-primary)] font-medium">0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Options premium</span>
              <span className="text-[var(--text-primary)] font-medium">0.00</span>
            </div>
          </div>
        </div>

        {/* Commodity Placeholder */}
        <div className="w-full lg:w-1/3 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl flex flex-col justify-center items-center text-center space-y-4 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Commodity</h3>
          <p className="text-[var(--text-muted)] text-sm">
            The commodity feature is currently not available.
          </p>
          <button className="bg-[var(--accent)] opacity-50 cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg inline-block transition-colors shadow-sm">
            Available Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Funds;
