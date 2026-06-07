const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { pool } = require('./db/pool');
const axios = require('axios');
let ioInstance = null;
let yahooFinance;

(async () => {
  if (!yahooFinance) {
    try {
      const yfModule = require('yahoo-finance2/dist/cjs/src/index.js');
      const YahooFinanceClass = yfModule.default || yfModule;
      yahooFinance = new YahooFinanceClass();
      console.log('✅ yahoo-finance2 initialized successfully using direct CJS bridge!');
    } catch (err) {
      console.warn('Warning: yahoo-finance2 failed to load via fallback. Indices will not be available.');
      console.error('Reason:', err.message);
      yahooFinance = null;
    }
  }
})();
function init(server) {
  if (ioInstance) return ioInstance;
  const allowedOrigins = [
    "https://trade-nest-six.vercel.app",
    "https://trade-nest-dboard.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ];
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie || '';
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch && tokenMatch[1];
    if (!token) return next(new Error('Auth error - token missing'));
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      socket.userId = decoded.id;
      next();
    } catch (e) {
      next(new Error('Auth error - invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    const { userId } = socket;
    console.log('Socket connected for user', userId);
    socket.join(userId);
    await emitWatchlist(userId);
    await emitOrders(userId);
    await emitFavourites(userId);
    await emitHoldings(userId);

    const favInterval = setInterval(() => emitFavourites(userId), 20000);

    const indicesInterval = setInterval(async () => {
      try {
        const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=^NSEI,^BSESN`;
        const res = await axios.get(url, {
          headers: { 'User-Agent': 'Mozilla/5.0' } 
        });
        const result = res.data?.quoteResponse?.result;
        if (result && result.length >= 2) {
          const nifty = result.find(r => r.symbol === '^NSEI');
          const sensex = result.find(r => r.symbol === '^BSESN');
          io.to(userId).emit('indices', { nifty, sensex });
        }
      } catch (err) {
        console.error('Error fetching indices via direct stream:', err.message);
      }
    }, 5000);


    socket.on('newOrder', async (payload, callback) => {
      try {
        const userId = socket.userId;
        const name = payload.name?.toUpperCase();
        const qty = Number(payload.qty);
        const price = Number(payload.price);
        const change = payload.change;
        const net = payload.net;
        const inputMode = payload.mode?.toUpperCase();
        if (!userId || !name || !qty || price == null || !inputMode || change == null || net == null) {
          return callback && callback({ error: 'Missing required fields for new order.' });
        }
        const now = new Date();
        const kolkataTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const date = new Date(kolkataTimeStr);
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();
        const isBeforeMarketOpen = currentHour < 9 || (currentHour === 9 && currentMinute < 15);
        const isAfterMarketClose = currentHour > 15 || (currentHour === 15 && currentMinute >= 30);
        const isOutsideMarketHours = isBeforeMarketOpen || isAfterMarketClose;
        let orderMode = inputMode;
        if (isOutsideMarketHours) {
          if (inputMode === 'BUY') {
            orderMode = 'PENDING_BUY';
          } else if (inputMode === 'SELL') {
            orderMode = 'PENDING_SELL';
          }
        } else {
          if (inputMode === 'BUY') {
            orderMode = 'BUY';
          } else if (inputMode === 'SELL') {
            orderMode = 'SELL';
          }
        }
        const totalCost = qty * price;
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const userRes = await client.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [userId]);
          const user = userRes.rows[0];
          if (!user) {
            await client.query('ROLLBACK');
            return callback && callback({ error: 'User not found.' });
          }
          if ((orderMode === 'BUY' || orderMode === 'PENDING_BUY') && (Number(user.available_margin) || 0) < totalCost) {
            await client.query('ROLLBACK');
            return callback && callback({ error: 'Not enough available margin.' });
          }

          const insertRes = await client.query('INSERT INTO orders(user_id, name, qty, price, mode, time) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [userId, name, qty, price, orderMode, now.toISOString()]);
          const newOrder = insertRes.rows[0];

          if (orderMode === 'PENDING_BUY') {
            await client.query('UPDATE users SET used_margin = COALESCE(used_margin,0) + $1, available_margin = COALESCE(available_margin,0) - $1 WHERE id=$2', [totalCost, userId]);
            await client.query('COMMIT');
            client.release();
            await emitOrders(userId);
            await emitHoldings(userId);
            await emitFavourites(userId);
            await emitWatchlist(userId);
            return callback && callback({ message: 'Order marked as PENDING. Will execute next market day.', status: 'pending' });
          }

          // BUY flow
          if (orderMode === 'BUY') {
            await client.query('UPDATE users SET available_margin = COALESCE(available_margin,0) - $1 WHERE id=$2', [totalCost, userId]);
            const holdingRes = await client.query('SELECT * FROM holdings WHERE user_id=$1 AND name=$2 FOR UPDATE', [userId, name]);
            const holding = holdingRes.rows[0];
            if (holding) {
              const totalQty = Number(holding.qty) + qty;
              const newAvg = ((Number(holding.avg) * Number(holding.qty)) + (price * qty)) / totalQty;
              const upd = await client.query('UPDATE holdings SET qty=$1, avg=$2, price=$3, net=$4, day=$5 WHERE id=$6 RETURNING *', [totalQty, newAvg, price, net, `${change}%`, holding.id]);
              await client.query('COMMIT');
              client.release();
              await emitOrders(userId);
              await emitHoldings(userId);
              await emitFavourites(userId);
              await emitWatchlist(userId);
              return callback && callback({ message: 'Holding updated after buy.', status: 'success' });
            } else {
              await client.query('INSERT INTO holdings(user_id, name, qty, avg, price, net, day) VALUES($1,$2,$3,$4,$5,$6,$7)', [userId, name, qty, price, price, net, `${change}%`]);
              await client.query('COMMIT');
              client.release();
              await emitOrders(userId);
              await emitHoldings(userId);
              await emitFavourites(userId);
              await emitWatchlist(userId);
              return callback && callback({ message: 'New holding added.', status: 'success' });
            }
          }

          if (orderMode === 'PENDING_SELL') {
            const holdingRes = await client.query('SELECT * FROM holdings WHERE user_id=$1 AND name=$2', [userId, name]);
            const holding = holdingRes.rows[0];
            if (!holding || Number(holding.qty) < qty) {
              await client.query('ROLLBACK');
              client.release();
              return callback && callback({ message: 'Not enough quantity to sell.', status: 'not' });
            }
            await client.query('COMMIT');
            client.release();
            await emitOrders(userId);
            await emitHoldings(userId);
            await emitFavourites(userId);
            await emitWatchlist(userId);
            return callback && callback({ message: 'Order marked as PENDING. Will execute next market day.', status: 'pending' });
          }

          if (orderMode === 'SELL') {
            const holdingRes = await client.query('SELECT * FROM holdings WHERE user_id=$1 AND name=$2 FOR UPDATE', [userId, name]);
            const holding = holdingRes.rows[0];
            if (!holding || Number(holding.qty) < qty) {
              await client.query('ROLLBACK');
              client.release();
              return callback && callback({ message: 'Not enough quantity to sell.', status: 'not' });
            }
            const newQty = Number(holding.qty) - qty;
            if (newQty === 0) {
              await client.query('DELETE FROM holdings WHERE id=$1', [holding.id]);
            } else {
              await client.query('UPDATE holdings SET qty=$1, price=$2 WHERE id=$3', [newQty, price, holding.id]);
            }
            await client.query('UPDATE users SET available_margin = COALESCE(available_margin,0) + $1 WHERE id=$2', [totalCost, userId]);
            await client.query('COMMIT');
            client.release();
            await emitOrders(userId);
            await emitHoldings(userId);
            await emitFavourites(userId);
            await emitWatchlist(userId);
            return callback && callback({ message: 'Holding updated after sell.', status: 'success' });
          }

          await client.query('ROLLBACK');
          client.release();
          return callback && callback({ error: 'Invalid order mode.' });
        } catch (err) {
          await client.query('ROLLBACK');
          client.release();
          throw err;
        }
      } catch (err) {
        console.error('Error processing socket newOrder:', err);
        return callback && callback({ error: 'Server error processing order.' });
      }
    });



    socket.on('addFavourite', async (name, cb) => {
      try {
        const userId = socket.userId;
        if (!name) return cb && cb({ error: 'Stock name is required' });
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const userRes = await client.query('SELECT favourites FROM users WHERE id=$1 FOR UPDATE', [userId]);
          const user = userRes.rows[0];
          if (!user) {
            await client.query('ROLLBACK');
            client.release();
            return cb && cb({ error: 'User not found' });
          }
          let favs = user.favourites && typeof user.favourites === 'string' ? JSON.parse(user.favourites) : user.favourites || [];
          const symbol = name.toUpperCase();
          if (!favs.find(f => f.symbol === symbol)) favs.push({ symbol });
          await client.query('UPDATE users SET favourites=$1 WHERE id=$2', [JSON.stringify(favs), userId]);
          await client.query('COMMIT');
          client.release();
          await emitFavourites(userId);
          await emitWatchlist(userId);
          return cb && cb({ message: 'Added to favourites' });
        } catch (err) {
          await client.query('ROLLBACK');
          client.release();
          throw err;
        }
      } catch (err) {
        console.error('Error adding favourite via socket:', err);
        return cb && cb({ error: 'Server error while adding favourite' });
      }
    });



    socket.on('deleteFavourite', async (name, cb) => {
      try {
        const userId = socket.userId;
        if (!name) return cb && cb({ error: 'Stock name is required' });
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const userRes = await client.query('SELECT favourites FROM users WHERE id=$1 FOR UPDATE', [userId]);
          const user = userRes.rows[0];
          if (!user) {
            await client.query('ROLLBACK');
            client.release();
            return cb && cb({ error: 'User not found' });
          }
          let favs = user.favourites && typeof user.favourites === 'string' ? JSON.parse(user.favourites) : user.favourites || [];
          const symbol = name.toUpperCase();
          favs = favs.filter(f => f.symbol !== symbol);
          await client.query('UPDATE users SET favourites=$1 WHERE id=$2', [JSON.stringify(favs), userId]);
          await client.query('COMMIT');
          client.release();
          await emitFavourites(userId);
          await emitWatchlist(userId);
          return cb && cb({ message: 'Deleted from favourites' });
        } catch (err) {
          await client.query('ROLLBACK');
          client.release();
          throw err;
        }
      } catch (err) {
        console.error('Error deleting favourite via socket:', err);
        return cb && cb({ error: 'Server error while deleting favourite' });
      }
    });



    socket.on('deleteOrder', async (orderId, cb) => {
        try {
          const userId = socket.userId;
          const id = parseInt(orderId, 10);
          if (isNaN(id)) return cb && cb({ error: 'Invalid order ID' });
          const client = await pool.connect();
          try {
            await client.query('BEGIN');
            const orderRes = await client.query('SELECT * FROM orders WHERE id=$1 FOR UPDATE', [id]);
            const order = orderRes.rows[0];
            if (!order || Number(order.user_id) !== Number(userId)) {
              await client.query('ROLLBACK');
              client.release();
              return cb && cb({ error: 'Order not found or not authorized' });
            }
            if (order.mode === 'PENDING_BUY') {
              const refundAmount = Number(order.qty) * Number(order.price);
              await client.query('UPDATE users SET used_margin = COALESCE(used_margin,0) - $1, available_margin = COALESCE(available_margin,0) + $1 WHERE id=$2', [refundAmount, userId]);
            }
            await client.query('DELETE FROM orders WHERE id=$1', [id]);
            await client.query('COMMIT');
            client.release();
            await emitOrders(userId);
            await emitHoldings(userId);
            await emitFavourites(userId);
            await emitWatchlist(userId);
            return cb && cb({ message: 'Order deleted successfully' });
          } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            throw err;
          }
        } catch (err) {
          console.error('Error deleting order via socket:', err);
          return cb && cb({ error: 'Internal Server Error' });
        }
      });


    socket.on('disconnect', () => {
      clearInterval(favInterval);
      clearInterval(indicesInterval);
      console.log('🔴 Socket disconnected for user', userId);
    });
  });

  ioInstance = io;
  return io;
}

function getIO() {
  return ioInstance;
}

async function emitWatchlist(userId) {
  if (!ioInstance) return;
  const userRes = await pool.query('SELECT favourites FROM users WHERE id=$1', [userId]);
  const favRaw = userRes.rows[0]?.favourites || [];
  const fav = typeof favRaw === 'string' ? JSON.parse(favRaw) : favRaw;
  const favData = await Promise.all(
    (fav || []).map(async (el) => {
      const symbol = el.symbol;
      try {
        const res = await axios.get(`https://stock.indianapi.in/stock?name=${symbol}`, {
          headers: { "X-Api-Key": process.env.API_KEY },
        });
        const data = res.data;
        const price = parseFloat(data?.currentPrice?.BSE);
        const percentChange = parseFloat(data.percentChange);
        const newPrice = price + (price * percentChange) / 100;
        const netChange = Math.abs(newPrice) - price;
        return {
          ...el,
          curr: isNaN(price) ? null : +price.toFixed(2),
          net: isNaN(netChange) ? null : +netChange.toFixed(2),
          change: isNaN(percentChange) ? null : +percentChange.toFixed(2),
        };
      } catch (e) {
        return { ...el, curr: null, net: null, change: null };
      }
    })
  );
  ioInstance.to(userId).emit('watchlist', favData);
}

async function emitOrders(userId) {
  if (!ioInstance) return;
  const res = await pool.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC', [userId]);
  ioInstance.to(userId).emit('orders', res.rows);
}

async function emitFavourites(userId) {
  if (!ioInstance) return;
  const userRes = await pool.query('SELECT favourites FROM users WHERE id=$1', [userId]);
  const favRaw = userRes.rows[0]?.favourites || [];
  const fav = typeof favRaw === 'string' ? JSON.parse(favRaw) : favRaw;
  const favData = await Promise.all(
    (fav || []).map(async (el) => {
      const symbol = el.symbol;
      try {
        const res = await axios.get(`https://stock.indianapi.in/stock?name=${symbol}`, {
          headers: { "X-Api-Key": process.env.API_KEY },
        });
        const data = res.data;
        const price = parseFloat(data?.currentPrice?.BSE);
        const percentChange = parseFloat(data.percentChange);
        const newPrice = price + (price * percentChange) / 100;
        const netChange = Math.abs(newPrice) - price;
        return {
          ...el,
          curr: isNaN(price) ? null : +price.toFixed(2),
          net: isNaN(netChange) ? null : +netChange.toFixed(2),
          change: isNaN(percentChange) ? null : +percentChange.toFixed(2),
        };
      } catch (e) {
        return { ...el, curr: null, net: null, change: null };
      }
    })
  );
  ioInstance.to(userId).emit('watchlist', favData);
}

async function emitHoldings(userId) {
  if (!ioInstance) return;
  const res = await pool.query('SELECT * FROM holdings WHERE user_id=$1', [userId]);
  ioInstance.to(userId).emit('holdings', res.rows);
}

module.exports = { init, getIO, emitWatchlist, emitOrders, emitFavourites, emitHoldings };