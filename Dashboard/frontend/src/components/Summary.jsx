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

  return (
    <div className="w-full p-4">
      {/* User Greeting */}
      <div className="mb-4">
        <h6 className="text-lg font-medium">Hi, {allData.username}!</h6>
        <hr className="my-2 border-gray-300" />
      </div>

      {/* Equity Section */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Equity Overview</p>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl font-semibold">{equity.toFixed(2)}</h3>
              <p className="text-sm text-gray-500">Total Equity</p>
            </div>

            <div className="flex flex-col text-sm text-gray-600">
              <p>
                Margin Available{" "}
                <span className="font-semibold text-black">
                  {allData.availableMargin || 0}
                </span>
              </p>
              <p>
                Margins Used{" "}
                <span className="font-semibold text-black">
                  {allData.marginsUsed || 0}
                </span>
              </p>
              <p>
                Opening Balance{" "}
                <span className="font-semibold text-black">
                  {allData.openingBalance || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
      </div>

      {/* Holdings Section */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Holdings Summary ({allHoldings.length})
        </p>

        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl font-semibold">{totalHoldingsValue.toFixed(2)}</h3>
              <p className="text-sm text-gray-500">Current Market Value</p>
            </div>

            <div className="flex flex-col text-sm text-gray-600">
              <p>
                Total Investment{" "}
                <span className="font-semibold text-black">
                  {totalInvestment.toFixed(2)}
                </span>
              </p>
              <p>
                Average Investment per Stock{" "}
                <span className="font-semibold text-black">
                  {allHoldings.length > 0
                    ? (totalInvestment / allHoldings.length).toFixed(2)
                    : 0}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
      </div>
    </div>
  );
};

export default Summary;
