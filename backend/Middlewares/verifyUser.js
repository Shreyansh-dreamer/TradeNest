const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // const token = req.cookies.token; // COOKIE METHOD
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // HEADER METHOD: "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Auth token not found" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("JWT Verify Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyUser;