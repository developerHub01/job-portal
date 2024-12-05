// middlewares/authMiddleware.js
const { AUTH_SECRET } = require("../constant");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    UserModel.getUserById(decoded.user_id, (err, userData) => {
      if (err || !userData) {
        console.error("Error fetching user data or user not found");
        return next();
      }

      if (userData) userData = userData[0];

      delete userData["password"];

      req.user = userData;

      return next();
    });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

module.exports = authenticateToken;
