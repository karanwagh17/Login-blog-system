require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.cookies.varificationToken;

  if (!token) {
    return res.status(401).json({ message: "Token not found. Unauthorized." });
  }

  jwt.verify(token, process.env.privateKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = decoded.user;

    next();
  });
};

module.exports = isAuth;
