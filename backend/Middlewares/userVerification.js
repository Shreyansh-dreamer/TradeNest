const User = require("../model/UsersModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ status: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    return res.status(200).json({
      status: true,
      user: user.username,
      userId: user._id,
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ status: false, message: "Invalid or expired token" });
  }
};
