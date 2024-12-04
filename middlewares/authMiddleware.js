// middlewares/authMiddleware.js
const { AUTH_SECRET } = require("../constant");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

module.exports = authenticateToken;
