const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("cirquip-auth-token");
  // Check for token
  if (!token) return res.status(401);

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecretKey"));
    // Add user from payload
    req.payload = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
