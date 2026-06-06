import { VerticalGraph } from "./VerticalGraph";

const Holdings = ({ allHoldings }) => {
  if (allHoldings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-4 text-[var(--text-primary)]">
        <h3 className="text-xl font-semibold mb-2">
          You have no Holdings yet.
        </h3>
        <p className="text-[var(--text-muted)] text-center mb-6">
          Start trading by placing your first order.
        </p>
        <button
          onClick={() => alert("Create holdings by buying and acquiring stocks")}
          className="bg-[var(--accent)] text-white px-6 py-2 rounded hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
        >
          Get Started
        </button>
      </div>
    );
  }

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(37, 99, 235, 0.5)", // Updated to match blue accent
        borderColor: "rgba(37, 99, 235, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Holdings ({allHoldings.length})</h3>

      <div className="overflow-x-auto w-full max-w-full rounded-lg border border-[var(--border-color)] shadow-sm bg-[var(--bg-card)]">
        <table className="min-w-max w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Instrument</th>
              <th className="px-4 py-3 font-medium">Qty.</th>
              <th className="px-4 py-3 font-medium">Avg. cost</th>
              <th className="hidden md:table-cell px-4 py-3 font-medium">LTP</th>
              <th className="px-4 py-3 font-medium">Cur. val</th>
              <th className="px-4 py-3 font-medium">Net chg.</th>
              <th className="hidden md:table-cell px-4 py-3 font-medium">Percent chg.</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--text-secondary)]">
            {allHoldings.map((stock, index) => {
              const curVal = stock.price * stock.qty;
              const isProfit = curVal - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "text-green-500" : "text-red-500";
              const dayClass = stock.isLoss ? "text-red-500" : "text-green-500";

              return (
                <tr key={index} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{stock.name}</td>
                  <td className="px-4 py-3">{stock.qty}</td>
                  <td className="px-4 py-3">{stock.avg.toFixed(2)}</td>
                  <td className="hidden md:table-cell px-4 py-3">{stock.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{curVal.toFixed(2)}</td>
                  <td className={`px-4 py-3 ${profClass}`}>{stock.net}</td>
                  <td className={`hidden md:table-cell px-4 py-3 ${dayClass}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="max-w-full mx-auto px-0 md:px-4 mt-8 overflow-x-auto bg-[var(--bg-card)] p-4 rounded-lg border border-[var(--border-color)] shadow-sm">
        <div className="min-w-[400px] h-[300px] w-full">
          <VerticalGraph data={data} />
        </div>
      </div>
    </div>
  );
};

export default Holdings;
