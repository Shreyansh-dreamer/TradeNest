import { VerticalGraph } from "./VerticalGraph";

const Holdings = ({ allHoldings }) => {
  if (allHoldings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
        <h3 className="title text-lg font-semibold">
          You have no Holdings yet.
        </h3>
        <p className="text-gray-600 text-center">
          Start trading by placing your first order.
        </p>
        <button
          onClick={() => alert("Create holdings by buying and acquiring stocks")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    );
  }

  // Graph data
  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title mb-4">Holdings ({allHoldings.length})</h3>

      <div className="order-table overflow-x-auto w-full max-w-full">
        <table className="min-w-max w-full border border-gray-300">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th className="hidden md:table-cell">LTP</th>
              <th>Cur. val</th>
              <th>Net chg.</th>
              <th className="hidden md:table-cell">Percent chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curVal = stock.price * stock.qty;
              const isProfit = curVal - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td className="hidden md:table-cell">{stock.price.toFixed(2)}</td>
                  <td>{curVal.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={`hidden md:table-cell ${dayClass}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Graph with responsive container and margin */}
      <div className="max-w-full mx-auto px-0 md:px-4 mt-8 overflow-x-auto">
        <div className="min-w-[400px] h-[400px] w-full">
          <VerticalGraph data={data} />
        </div>
      </div>
    </>
  );
};

export default Holdings;
