require('dotenv').config();
const express = require("express");
const { pool } = require('./db/pool');
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const passport = require("./config/passport")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyUser = require("./Middlewares/verifyUser");
const fundsRoutes = require("./routes/fundRoutes");
const apiRoutes = require("./routes/apiRoutes");
const axios = require('axios');
const http = require('http');
const { init: initSocket } = require('./socket');

const PORT = process.env.PORT || 3002;

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

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      last_logged_in TIMESTAMPTZ,
      available_margin NUMERIC DEFAULT 0,
      payin NUMERIC DEFAULT 0,
      opening_balance NUMERIC DEFAULT 0,
      used_margin NUMERIC DEFAULT 0,
      favourites JSONB DEFAULT '[]'::jsonb
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS holdings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name TEXT,
      qty INTEGER,
      avg NUMERIC,
      price NUMERIC,
      net TEXT,
      day TEXT
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name TEXT,
      qty INTEGER,
      price NUMERIC,
      mode TEXT,
      time TIMESTAMPTZ
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS positions (
      id SERIAL PRIMARY KEY,
      product TEXT,
      name TEXT,
      qty INTEGER,
      avg NUMERIC,
      price NUMERIC,
      net TEXT,
      day TEXT,
      is_loss BOOLEAN
    )`);

    // ensure a default user exists
    const userCheck = await client.query('SELECT id FROM users WHERE email=$1 LIMIT 1', ['user@gmail.com']);
    if (!userCheck.rows[0]) {
      const hashed = await bcrypt.hash('user@1234', 10);
      await client.query('INSERT INTO users(username,email,password,last_logged_in) VALUES($1,$2,$3,$4)', ['user','user@gmail.com',hashed,new Date()]);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

app.get("/userData", verifyUser, async (req, res) => {
    const userId = req.userId;
    try {
        const userRes = await pool.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [userId]);
        res.json(userRes.rows[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get("/allPositions", async (req, res) => {
    try {
        const posRes = await pool.query('SELECT * FROM positions');
        res.json(posRes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete("/deleteOrder/:id", verifyUser, async (req, res) => {
    const userId = req.userId;
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) return res.status(400).json({ error: 'Invalid order ID' });
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const orderRes = await client.query('SELECT * FROM orders WHERE id=$1 FOR UPDATE', [orderId]);
        const order = orderRes.rows[0];
        if (!order || Number(order.user_id) !== Number(userId)) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Order not found or not authorized' });
        }
        if (order.mode === 'PENDING_BUY') {
            const refundAmount = Number(order.qty) * Number(order.price);
            await client.query('UPDATE users SET used_margin = COALESCE(used_margin,0) - $1, available_margin = COALESCE(available_margin,0) + $1 WHERE id=$2', [refundAmount, userId]);
        }
        await client.query('DELETE FROM orders WHERE id=$1', [orderId]);
        await client.query('COMMIT');
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error deleting order:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
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
server.listen(PORT, async () => {
    console.log(`App is listening to port ${PORT}`);
    try {
        await initDb();
        console.log('Postgres DB initialized');
    } catch (err) {
        console.error('DB init error:', err);
    }
});

require("./cron/schedulePendingBuyOrders");
require("./cron/schedulePendingSellOrders");