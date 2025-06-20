const cron = require('node-cron');
const axios = require('axios');
const {OrdersModel} = require("../model/OrdersModel");
const {HoldingsModel} = require("../model/HoldingsModel");
const {UsersModel} = require("../model/UsersModel");

async function processPendingOrders() {
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const date = new Date(now);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDay();

  if (day === 0 || day === 6) return;

  const afterStart = hour > 9 || (hour === 9 && minute >= 15);
  const beforeEnd = hour < 15 || (hour === 15 && minute <= 30);
  if (!(afterStart && beforeEnd)) return;

  const pendingOrders = await OrdersModel.find({ mode: "PENDING_BUY" });
  if (!pendingOrders.length) return;

  for (const order of pendingOrders) {
    const { userId, name, qty, price: boughtPrice } = order;

    try {
      const stockRes = await axios.get(`https://stock.indianapi.in/stock?name=${name}`, {
        headers: { "X-Api-Key": process.env.API_KEY },
      });

      const marketPrice = parseFloat(stockRes.data?.currentPrice?.BSE);
      const percentChange = parseFloat(stockRes.data?.percentChange || "0");

      if (isNaN(marketPrice)) {
        console.warn(`Invalid market price for ${name}`);
        continue;
      }

      if (marketPrice <= boughtPrice) {
        const totalCost = qty * boughtPrice;
        const refund = marketPrice < boughtPrice ? (boughtPrice - marketPrice) * qty : 0;

        let holding = await HoldingsModel.findOne({ userId, name });

        if (holding) {
          const totalQty = holding.qty + qty;
          const newAvg = ((holding.avg * holding.qty) + (boughtPrice * qty)) / totalQty;
          const netChange = (marketPrice - holding.price) * totalQty;

          holding.avg = newAvg;
          holding.qty = totalQty;
          holding.price = marketPrice;
          holding.net = netChange.toFixed(2);
          holding.day = percentChange.toFixed(2) + "%";

          await holding.save();
        } else {
          await HoldingsModel.create({
            userId,
            name,
            qty,
            avg: boughtPrice,
            price: marketPrice,
            net: 0,
            day: percentChange.toFixed(2) + "%",
          });
        }

        order.mode = "BUY";
        await order.save();

        await UsersModel.findByIdAndUpdate(userId, {
          $inc: {
            usedMargin: -totalCost,
            availableMargin: refund,
          },
        });
      }
    } catch (err) {
      console.error(`Error processing PENDING_BUY order ${order._id}:`, err.message);
    }
    //else this means marketprice is more than boughtprice, hence orders remain pending
  }

  console.log("Processed all PENDING_BUY orders at", date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
}

cron.schedule("* * * * 1-5", processPendingOrders);
