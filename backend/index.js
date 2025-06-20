require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const { UsersModel } = require("./model/UsersModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require("./model/OrdersModel");
const jwt = require("jsonwebtoken");
const passport = require("./config/passport")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyUser = require("./Middlewares/verifyUser");
const fundsRoutes = require("./routes/fundRoutes");
const apiRoutes = require("./routes/apiRoutes");
const axios = require("axios");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use('/', authRoutes);
app.use("/", fundsRoutes);
app.use("/", apiRoutes);

app.get("/verifyUser", verifyUser, (req, res) => {
    res.status(200).json({ status: true, userId: req.userId });
});

// app.get('/addUsers', async (req, res) => {
//     let tempUsers = [
//         {
//             username: "user",
//             email: "user@gmail.com",
//             password: "user@1234",
//             lastLoggedIn: Date.now(),
//             availableMargin:0,
//             payin: 0,
//             openingBalance: 0,
//             usedMargin: 0,
//             favourites: [],
//         }
//     ]
//     tempUsers.forEach((item) => {
//         let newUser = new UsersModel({
//             username:item.username,
//             email:item.email,
//             password:item.password,
//             lastLoggedIn:item.lastLoggedIn,
//             availableMargin:item.availableMargin,
//             payin:item.payin,
//             openingBalance:item.openingBalance,
//             usedMargin: item.usedMargin,
//             favourites: item.favourites,
//         });

//         newUser.save();
//     });
//     res.send("User dummy data initialised");
// })

// app.get('/addPositions', async (req, res) => {
//     let tempPositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];
//     tempPositions.forEach((item)=>{
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss:item.isLoss,
//         });

//         newPosition.save();
//     });
//     res.send("Position dummy data initialised");
// })

// app.get('/addHoldings', async (req, res) => {
//     let tempHoldings = [
//         {
//             userId: "683ea6bdb1461e6c4fa3b2a8",
//             name: "BHARTIARTL",
//             qty: 2,
//             avg: 538.05,
//             price: 541.15,
//             net: "+0.58%",
//             day: "+2.99%",
//         },
//         {
//             userId: "683ea6bdb1461e6c4fa3b2a8",
//             name: "HDFCBANK",
//             qty: 2,
//             avg: 1383.4,
//             price: 1522.35,
//             net: "+10.04%",
//             day: "+0.11%",
//         },
//     ]
//     tempHoldings.forEach(
//         (item) => {
//             let newHolding = new HoldingsModel({
//                 userId:new mongoose.Types.ObjectId(item.userId),
//                 name: item.name,
//                 qty: item.qty,
//                 avg: item.avg,
//                 price: item.price,
//                 net: item.net,
//                 day: item.day,
//             });

//             newHolding.save();
//         }
//     );
//     res.send("Initial data saved");
// })

app.get("/userData", verifyUser, async (req, res) => {
    const userId = req.userId;
    try {
        const userData = await UsersModel.findById(userId);
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get("/allHoldings", verifyUser, async (req, res) => {
    const userId = req.userId;  //from verifyUser middleware
    try {
        const holdings = await HoldingsModel.find({ userId: new mongoose.Types.ObjectId(String(userId)) });
        res.json(holdings);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder", verifyUser, async (req, res) => {
    try {
        const userId = req.userId;
        const name = req.body.name?.toUpperCase();
        const qty = Number(req.body.qty);
        const price = Number(req.body.price);
        const change = req.body.change;
        const net = req.body.net;
        const inputMode = req.body.mode?.toUpperCase();

        if (!userId || !name || !qty || !price || !inputMode || !change || !net) {
            return res.status(400).send("Missing required fields for new order.");
        }

        const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const date = new Date(now);
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();
        const isBeforeMarketOpen = currentHour < 9 || (currentHour === 9 && currentMinute < 15);
        const isAfterMarketClose = currentHour > 15 || (currentHour === 15 && currentMinute >= 30);

        const isOutsideMarketHours = isBeforeMarketOpen || isAfterMarketClose;

        let orderMode = inputMode;

        if (isOutsideMarketHours) {
            if (inputMode === "BUY") {
                orderMode = "PENDING_BUY";
            } else if (inputMode === "SELL") {
                orderMode = "PENDING_SELL";
            }
        }
        else {
            if (inputMode === "BUY") {
                orderMode = "BUY";
            } else if (inputMode === "SELL") {
                orderMode = "SELL";
            }
        }

        const totalCost = qty * price;
        console.log("orderMode decided:", orderMode);

        const user = await UsersModel.findById(userId);
        if (!user) return res.status(404).send("User not found.");

        // Check margin only for BUY or PENDING
        if ((orderMode === "BUY" || orderMode === "PENDING_BUY") && user.availableMargin < totalCost) {
            return res.status(400).send("Not enough available margin.");
        }

        // Create order record
        const newOrder = new OrdersModel({
            userId,
            name,
            qty,
            price,
            mode: orderMode,
            time: now,
        });
        await newOrder.save();

        // Handle PENDING
        if (orderMode === "PENDING_BUY") {
            await UsersModel.findByIdAndUpdate(userId, {
                $inc: {
                    usedMargin: totalCost,
                    availableMargin: -totalCost,
                },
            });
            return res.status(200).json({
                message: "Order marked as PENDING. Will execute next market day.",
                status: "pending",
            });
        }

        const holding = await HoldingsModel.findOne({
            userId,
            name,
        });


        // Handle BUY
        if (orderMode === "BUY") {
            await UsersModel.findByIdAndUpdate(userId, {
                $inc: { availableMargin: -totalCost },
            });

            if (holding) {
                const totalQty = holding.qty + qty;
                const newAvg = ((holding.avg * holding.qty) + (price * qty)) / totalQty;

                holding.qty = totalQty;
                holding.avg = newAvg;
                holding.price = price;
                holding.net = net;
                holding.day = `${change}%`;
                await holding.save();

                return res.status(200).json({ message: "Holding updated after buy.", status: "success" });
            } else {
                const newHolding = new HoldingsModel({
                    userId,
                    name,
                    qty,
                    avg: price,
                    price,
                    net,
                    day: `${change}%`,
                });
                await newHolding.save();

                return res.status(200).json({ message: "New holding added.", status: "success" });
            }
        }

        if (orderMode === "PENDING_SELL") {
            if (!holding || holding.qty < qty) {
                return res.status(400).json({
                    message: "Not enough quantity to sell.",
                    status: "not",
                });
            }
            return res.status(200).json({
                message: "Order marked as PENDING. Will execute next market day.",
                status: "pending",
            });
        }

        // Handle SELL
        if (orderMode === "SELL") {
            if (!holding || holding.qty < qty) {
                return res.status(400).json({
                    message: "Not enough quantity to sell.",
                    status: "not",
                });
            }

            holding.qty -= qty;
            holding.price = price;

            await UsersModel.findByIdAndUpdate(userId, {
                $inc: { availableMargin: totalCost },
            });

            if (holding.qty === 0) {
                await HoldingsModel.deleteOne({ userId, name });
                return res.status(200).json({ message: "Holding sold completely and removed.", status: "success" });
            } else {
                await holding.save();
                return res.status(200).json({ message: "Holding updated after sell.", status: "success" });
            }
        }

        return res.status(400).send("Invalid order mode.");

    } catch (err) {
        console.error("Error processing new order:", err);
        res.status(500).send("Server error processing order.");
    }
});

app.get("/allOrders", verifyUser, async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(400).send("Missing userId");

    try {
        const orders = await OrdersModel.find({ userId: new mongoose.Types.ObjectId(String(userId)) });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.delete("/deleteOrder/:id", verifyUser, async (req, res) => {
  const userId = req.userId;
  const orderId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await OrdersModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ error: "Order not found or not authorized" });
    }

    if (order.mode === "PENDING_BUY") {
      const refundAmount = order.qty * order.price;
      await UsersModel.findByIdAndUpdate(userId, {
        $inc: {
          usedMargin: -refundAmount,
          availableMargin: refundAmount,
        },
      });
    }

    await OrdersModel.deleteOne({ _id: orderId });

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/addFavourites", verifyUser, async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;
    if (!name) return res.status(400).send("Stock name is required");
    try {
        const user = await UsersModel.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    favourites: { symbol: name.toUpperCase() }
                }
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("Added to favourites");
    } catch (err) {
        console.error("Server error while adding favourite:", err);
        res.status(500).send("Server error while adding favourite");
    }
});

app.post("/deleteFavourites", verifyUser, async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;
    if (!name) return res.status(400).send("Stock name is required");
    try {
        const user = await UsersModel.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    favourites: { symbol: name.toUpperCase() }
                }
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("Deleted from favourites");
    } catch (err) {
        console.error("Server error while deleting favourite:", err);
        res.status(500).send("Server error while deleting favourite");
    }
});

app.post("/logout",verifyUser, (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });
        res.status(200).json({ message: 'Logged out', status: 'logout' });
    } catch (err) {
        res.status(500).json({ message: "Logout failed", error: err.message });
    }
});


app.listen(PORT, () => {
    console.log("App is listening to port 3002");
    mongoose.connect(uri);
    console.log("Database also connected");
});

require("./cron/schedulePendingBuyOrders");
require("./cron/schedulePendingSellOrders");