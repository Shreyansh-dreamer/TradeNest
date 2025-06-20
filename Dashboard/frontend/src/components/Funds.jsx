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
      .get("http://localhost:3002/userData", {
        withCredentials: true,
      })
      .then((res) => {
        setAllData(res.data);
        setAvailableMargin(res.data.availableMargin || 0);
        setUsedMargin(res.data.usedMargin || 0);
        setPayin(res.data.payin || 0);
        setOpeningBalance(res.data.openingBalance || 0);
      });
  }, []);

  // Update dependent margins when availableMargin changes
  useEffect(() => {
    setDeliveryMargin((availableMargin * 0.05).toFixed(2));
  }, [availableMargin]);

  const handleAddFunds = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      axios
        .post(
          "http://localhost:3002/addFunds",
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          setAvailableMargin(res.data.availableMargin);
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
          "http://localhost:3002/withdrawFunds",
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          setAvailableMargin(res.data.availableMargin);
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
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="text-sm text-gray-600 text-center sm:text-left">
          Instant, zero-cost fund transfers with UPI
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Add amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-md text-sm w-28"
            />
            <button
              onClick={handleAddFunds}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Add Funds
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Withdraw amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-md text-sm w-32"
            />
            <button
              onClick={handleWithdraw}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Equity</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-800 gap-x-8">
            <div className="flex justify-between">
              <span>Available margin</span>
              <span className="text-green-600 font-medium">
                {availableMargin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Used margin</span>
              <span className="font-medium">{usedMargin}</span>
            </div>
            <div className="flex justify-between">
              <span>Available cash</span>
              <span className="font-medium">{availableCash.toFixed(2)}</span>
            </div>

            <div className="col-span-full border-t border-gray-300 my-2" />

            <div className="flex justify-between">
              <span>Opening Balance</span>
              <span>{openingBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Payin</span>
              <span>{payin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SPAN</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery margin</span>
              <span>{deliveryMargin}</span>
            </div>
            <div className="flex justify-between">
              <span>Exposure</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Options premium</span>
              <span>0.00</span>
            </div>

            {/* <div className="col-span-full border-t border-gray-300 my-2" />

            <div className="flex justify-between">
              <span>Collateral (Liquid funds)</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Collateral (Equity)</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Total Collateral</span>
              <span>{totalCollateral.toFixed(2)}</span>
            </div> */}
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-gray p-4 rounded-lg space-y-4">
          <p className="text-gray-700 text-sm">
            The commodity feature is currently not available
          </p>
          <Link
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg inline-block transition"
            to="#"
          >
            Available Soon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Funds;
