import { useState, useEffect } from "react";
import { onSocket, getLastOrders, emitSocket } from '../socket';
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = () => {
    setAllOrders(getLastOrders());
  };

  useEffect(() => {
    fetchOrders();
    const off = onSocket('orders', (data) => setAllOrders(data || []));
    return () => off();
  }, []);

  const handleDelete = (id) => {
    emitSocket('deleteOrder', id, (res) => {
      if (res?.error) console.error('Error deleting order:', res.error);
    });
  };

  if (allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-4 text-[var(--text-primary)]">
        <h3 className="text-xl font-semibold mb-2">
          You have no orders placed yet.
        </h3>
        <p className="text-[var(--text-muted)] text-center mb-6">
          Start trading by placing your first order.
        </p>
        <button
          onClick={() => alert("Buy or sell stocks to see your orders")}
          className="bg-[var(--accent)] text-white px-6 py-2 rounded hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        Orders ({allOrders.length})
      </h3>

      <div className="overflow-x-auto w-full max-w-full rounded-lg border border-[var(--border-color)] shadow-sm bg-[var(--bg-card)]">
        <table className="min-w-max w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Instrument</th>
              <th className="px-4 py-3 font-medium">Qty.</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3 font-medium">Date & Time</th>
              <th className="px-4 py-3 font-medium">Status / Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--text-secondary)]">
            {allOrders.map((order, index) => (
              <tr
                key={order.id || index}
                className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors cursor-default"
              >
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{order.name}</td>
                <td className="px-4 py-3">{order.qty}</td>
                <td className="px-4 py-3">
                  {order.price ? Number(order.price).toFixed(2) : "0.00"}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    order.mode === "BUY" || order.mode === "PENDING_BUY"
                      ? "text-blue-500"
                      : order.mode === "SELL" || order.mode === "PENDING_SELL"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {/* {order.mode ? order.mode.replace("PENDING_", "") : "UNKNOWN"} */}
                  {order.mode?.startsWith("PENDING_") && (
                    <span className="text-[10px] block text-amber-500 font-normal tracking-wide">(Pending)</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {order.time ? new Date(order.time).toLocaleString() : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {order.mode === "PENDING_BUY" || order.mode === "PENDING_SELL" ? (
                    <Tooltip title="Cancel Order" arrow>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  ) : (
                    <span className="text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded text-xs font-medium border border-[var(--border-color)]">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;