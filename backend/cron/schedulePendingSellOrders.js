const cron = require('node-cron');
const axios = require('axios');
const {OrdersModel} = require("../model/OrdersModel");
const {HoldingsModel} = require("../model/HoldingsModel");
const {UsersModel} = require("../model/UsersModel");

async function processPendingSellOrders() {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const date = new Date(now);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDay();

    if (day === 0 || day === 6) return;

    const afterMarketOpen = hour > 9 || (hour === 9 && minute >= 15);
    const beforeMarketClose = hour < 15 || (hour === 15 && minute <= 30);
    
    if (!(afterMarketOpen && beforeMarketClose)) return;
    
    const pendingOrders = await OrdersModel.find({ mode: "PENDING_SELL" });
    if (!pendingOrders.length) return;

    for (const order of pendingOrders) {
        const { userId, name, qty, price: soldPrice } = order;

        try {
            const stockRes = await axios.get(`https://stock.indianapi.in/stock?name=${name}`, {
                headers: { "X-Api-Key": process.env.API_KEY },
            });

            const marketPrice = parseFloat(stockRes.data?.currentPrice?.BSE);
            const percentChange = parseFloat(stockRes.data?.percentChange || "0");

            if (isNaN(marketPrice)) continue;

            const totalRevenue = qty * soldPrice;

            let holding = await HoldingsModel.findOne({ userId, name });

            if (holding) {
                holding.qty -= qty;
                holding.price = marketPrice;
                holding.day = percentChange.toFixed(2) + "%";

                if (holding.qty <= 0) {
                    await HoldingsModel.deleteOne({ _id: holding._id });
                } else {
                    holding.net = ((marketPrice - holding.avg) * holding.qty).toFixed(2);
                    await holding.save();
                }
            }

            order.mode = "SELL";
            await order.save();

            await UsersModel.findByIdAndUpdate(userId, {
                $inc: { availableMargin: totalRevenue },
            });

        } catch (err) {
            console.error(`Error processing order ${order._id}:`, err);
        }
    }
}

cron.schedule("* * * * 1-5", processPendingSellOrders);
