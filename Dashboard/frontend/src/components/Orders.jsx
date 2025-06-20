import { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const fetchOrders = () => {
    axios.get("http://localhost:3002/allOrders", {
      withCredentials: true,
    }).then((res) => {
      setAllOrders(res.data);
    }).catch((err) => {
      console.error("Error fetching orders:", err);
    });
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(()=>{
      fetchOrders();
    },300000);

    return ()=> clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/deleteOrder/${id}`,{
      withCredentials: true,
    }).then(() => {
      fetchOrders();
    }).catch((err) => {
      console.error("Error deleting order:", err);
    });
  };

  if (allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h3 className="title text-lg font-semibold">
          You have no orders placed yet.
        </h3>
        <p className="text-gray-600">
          Start trading by placing your first order.
        </p>
        <button
          onClick={() => alert("Buy or sell stocks to see your orders")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Orders ({allOrders.length})
      </h3>

      <div className="order-table overflow-y-auto max-h-screen scrollbar">
        <table className="border border-gray-300 min-w-full text-sm">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Date & Time</th>
              <th>Status / Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-100 cursor-default"
              >
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td
                  className={
                    order.mode === "BUY"
                      ? "text-green-600"
                      : order.mode === "SELL"
                        ? "text-red-600"
                        : "text-yellow-500"
                  }
                >
                  {order.mode}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.mode === "PENDING_BUY" || order.mode==="PENDING_SELL" ? (
                    <Tooltip title="Cancel Order" arrow>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  ) : (
                    <span className="text-gray-600">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;