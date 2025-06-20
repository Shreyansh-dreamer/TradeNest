import { useState, useEffect } from "react";
import axios from "axios";

const BuyActionWindow = ({ stock, onClose }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(stock?.curr || 0.0);
    const [availableMargin, setAvailableMargin] = useState(0);

    useEffect(() => {
        if (stock?.curr !== undefined) {
            setStockPrice(stock.curr);
        }
    }, [stock?.curr]);

    useEffect(() => {
        axios
            .get("http://localhost:3002/userData", { withCredentials: true })
            .then((res) => {
                setAvailableMargin(res.data.availableMargin);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, []);

    const handleBuyClick = async () => {
        const totalCost = stockQuantity * stockPrice;
        if (availableMargin === undefined || availableMargin < totalCost) {
            alert("Not enough margin available. Please go to the Funds section.");
            return;
        }
        try {
            await axios.post(
                "http://localhost:3002/newOrder",
                {
                    name: stock.symbol,
                    qty: Number(stockQuantity),
                    price: Number(stockPrice),
                    change: Number(stock.change),
                    net: Number(stock.net),
                    mode: "BUY",
                },
                { withCredentials: true }
            );
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error placing buy order:", error.response ? error.response.data : error.message);
            alert(`Failed to place buy order: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div
            className={`
                absolute left-0 right-0 bottom-20 z-50 
                mx-auto w-full max-w-[480px]  
                h-fit max-h-[80vh] overflow-y-auto
                border border-gray-200 rounded-xl shadow-xl bg-gray-100
                p-4
            `}
        >
            <div className="text-lg font-semibold text-gray-800 mb-3 ml-5">
                Buy {stock.symbol}
            </div>
            <div className="bg-white p-4 rounded-md mb-4">
                <div className="flex flex-col md:flex-row justify-between mb-4 flex-wrap gap-2">
                    <fieldset className="w-full md:w-[48%] border border-gray-300 rounded px-2">
                        <legend className="text-sm px-1">Qty.</legend>
                        <input
                            type="number"
                            className="w-full p-2 text-lg focus:outline-none"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(Number(e.target.value))}
                            min={1}
                        />
                    </fieldset>
                    <fieldset className="w-full md:w-[48%] border border-gray-300 rounded px-2">
                        <legend className="text-sm px-1 text-gray-400">Price (per unit)</legend>
                        <input
                            type="number"
                            className="w-full p-2 text-lg focus:outline-none bg-gray-100"
                            value={stockPrice}
                            readOnly
                        />
                    </fieldset>
                </div>
                <div className="text-sm text-gray-700 mt-2">
                    Total Cost: ₹{(stockPrice * stockQuantity).toFixed(2)}
                </div>
            </div>
            <div className="flex justify-end items-center flex-wrap gap-2">
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded text-sm"
                    onClick={handleBuyClick}
                >
                    Buy
                </button>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded text-sm"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BuyActionWindow;
