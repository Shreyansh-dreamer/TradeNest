const express = require('express');
const { Signup, Login, resetPassword } = require('../Controllers/AuthController');
const router = express.Router();
const sendOtpMail = require('../utils/sendOtpMail');
const {UsersModel} = require('../model/UsersModel');
const jwt = require("jsonwebtoken");

const otpStore = new Map();

router.post('/getOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email, { otp, expiresAt });

  try {
    await sendOtpMail(email, otp);
    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
});

router.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;
  const data = otpStore.get(email);

  if (!data || Date.now() > data.expiresAt) {
    return res.status(400).json({ message: 'OTP expired or not found' });
  }

  if (data.otp !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }
  const tempToken=jwt.sign({email},process.env.DUMMY_SECRET_KEY,{expiresIn:"15m"});
    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: false,
      sameSite: "Lax", 
    });
  const user = await UsersModel.findOne({ email });
  if (user) {
    return res.status(200).json({ status: 'login' });
  } else {
    return res.status(200).json({ status: 'signup' });
  }
});

router.post("/getUsername", async (req, res) => {
    const token = req.cookies.tempToken;
    if (!token) return res.status(401).json({ message: "Temp token required" });

    try {
        const payload = jwt.verify(token, process.env.DUMMY_SECRET_KEY);
        const { email } = payload;
        if (!email) return res.status(400).json({ success: false, message: "Email is required in token" });

        const user = await UsersModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found for this email" });

        res.json({ success: true, username: user.username });
    } catch (err) {
        console.error("Error fetching username:", err);
        res.status(401).json({ success: false, message: "Invalid or expired temp token" });
    }
});

router.post('/getOtp1', async (req, res) => {
  const {email} = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email, { otp, expiresAt });

  try {
    await sendOtpMail(email, otp);
    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
});

router.post('/verifyOTP1', async (req, res) => {
  const {email,otp } = req.body;
  const data = otpStore.get(email);

  if (!data || Date.now() > data.expiresAt) {
    return res.status(400).json({ message: 'OTP expired or not found' });
  }

  if (data.otp !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }
  const newResetTempToken = jwt.sign({ email, reset: true }, process.env.DUMMY_SECRET_KEY, { expiresIn: "15m" });
  res.clearCookie("tempToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });

    // Set the new tempToken specifically for password reset
    res.cookie("tempToken", newResetTempToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes for reset flow
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });
    res.status(200).json({ status: 'otp_verified', message: 'OTP verified! Proceed to reset password.' });
});

router.post("/getEmailFromToken", (req, res) => {
  const token = req.cookies.tempToken;
  if (!token) {
    console.log("No tempToken cookie found");
    return res.status(401).json({ message: "No token" });
  }
  try {
    const payload = jwt.verify(token, process.env.DUMMY_SECRET_KEY);
    return res.json({ email: payload.email });
  } catch (err) {
  console.log("JWT verification failed:", err.message);
  return res.status(401).json({ message: "Invalid or expired token" });
}
});


router.post("/signup", Signup);
router.post('/login', Login);
router.post("/resetPassword", resetPassword);

module.exports = router;


