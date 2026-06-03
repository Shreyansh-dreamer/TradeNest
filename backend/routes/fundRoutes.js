const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const verifyUser = require("../Middlewares/verifyUser");

router.post("/addFunds", verifyUser, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;
  if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userRes = await client.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [userId]);
    const user = userRes.rows[0];
    if (!user) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'User not found' });
    }
    const newPayin = (Number(user.payin) || 0) + Number(amount);
    const newAvailable = (Number(user.available_margin) || 0) + Number(amount);
    const newOpening = (user.opening_balance === 0 || user.opening_balance === null) ? Number(amount) : user.opening_balance;
    const upd = await client.query(
      'UPDATE users SET payin=$1, available_margin=$2, opening_balance=$3 WHERE id=$4 RETURNING *',
      [newPayin, newAvailable, newOpening, userId]
    );
    await client.query('COMMIT');
    const updatedUser = upd.rows[0];
    res.status(200).json({
      message: `Successfully added ₹${amount} to your account.`,
      availableMargin: updatedUser.available_margin,
      payin: updatedUser.payin,
      openingBalance: updatedUser.opening_balance,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

router.post("/withdrawFunds", verifyUser, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userRes = await client.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [userId]);
    const user = userRes.rows[0];
    if (!user) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'User not found' });
    }
    const newAvailable = (Number(user.available_margin) || 0) - Number(amount);
    const upd = await client.query('UPDATE users SET available_margin=$1 WHERE id=$2 RETURNING *', [newAvailable, userId]);
    await client.query('COMMIT');
    const updatedUser = upd.rows[0];
    res.status(200).json({
      message: `Successfully withdrawn ₹${amount} from your account.`,
      availableMargin: updatedUser.available_margin,
      payin: updatedUser.payin,
      openingBalance: updatedUser.opening_balance,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
