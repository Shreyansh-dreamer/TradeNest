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
const axios = require('axios');
const http = require('http');
const { init: initSocket, emitOrders, emitWatchlist, emitFavourites } = require('./socket');

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

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
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


app.post("/logout", verifyUser, (req, res) => {
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

app.post("/logout", verifyUser, (req, res) => {
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


const server = http.createServer(app);
initSocket(server);
server.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Database also connected');
    }).catch(err => console.error('Mongo connection error:', err));
});

require("./cron/schedulePendingBuyOrders");
require("./cron/schedulePendingSellOrders");