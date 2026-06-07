const { pool } = require("../db/pool");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const getSignupRedirectUrl = () => {
  const frontendUrl = process.env.VITE_MAIN_URL || "https://trade-nest-six.vercel.app";
  const redirectBase = frontendUrl.startsWith("http") ? frontendUrl : `https://${frontendUrl}`;
  return `${redirectBase}/signup`;
};


module.exports.Signup = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No tempToken found", redirect: getSignupRedirectUrl() });
  try {
    const payload = jwt.verify(token, process.env.DUMMY_SECRET_KEY);
    const { email } = payload;
    const { username, password, createdAt } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insert = await pool.query('INSERT INTO users(username, email, password, last_logged_in) VALUES($1,$2,$3,$4) RETURNING *', [username, email, hashedPassword, createdAt || new Date()]);
    const user = insert.rows[0];
    const sessionToken = createSecretToken(user.id);
    /* res.cookie("token", sessionToken, { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    /* res.clearCookie("tempToken", { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    res.status(201).json({ message: "User signed in successfully", success: true, user, status: 'yes', token: sessionToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", redirect: getSignupRedirectUrl() });
  }
};


module.exports.Login = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No tempToken found", redirect: getSignupRedirectUrl() });
  try {
    const payload = jwt.verify(token, process.env.DUMMY_SECRET_KEY);
    const { email } = payload;
    const { password } = req.body;
    const userRes = await pool.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
    const user = userRes.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const sessionToken = createSecretToken(user.id);
    /* res.cookie("token", sessionToken, { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    /* res.clearCookie("tempToken", { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    res.status(201).json({ message: "User logged in successfully", success: true, status: 'yes', token: sessionToken });
  } catch (err) {
    res.status(500).json({ message: "Server error", redirect: getSignupRedirectUrl() });
  }
}


module.exports.resetPassword = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No tempToken found", redirect: getSignupRedirectUrl() });
  try {
    const payload = jwt.verify(token, process.env.DUMMY_SECRET_KEY);
    const { email } = payload;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const upd = await pool.query('UPDATE users SET password=$1 WHERE email=$2 RETURNING *', [hashedPassword, email]);
    if (!upd.rows[0]) return res.status(404).json({ message: "User not found." });
    const sessionToken = createSecretToken(upd.rows[0].id);
    /* res.cookie("token", sessionToken, { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    /* res.clearCookie("tempToken", { httpOnly: true, secure: true, sameSite: "None", path: '/' }); */
    res.status(200).json({ message: "Password updated successfully.", token: sessionToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", redirect: getSignupRedirectUrl() });
  }
};