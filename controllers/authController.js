const { AUTH_SECRET } = require("../constant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    User.createUser(name, email, hashedPassword, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err?.message || "Error registering user" });
      }

      return res.redirect("/login");
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (err, users) => {
    if (err) return res.status(500).json({ message: "Error finding user" });

    if (users.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = users[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.status(400).json({ message: "Invalid email or password" });

      const token = jwt.sign({ user_id: user.user_id }, AUTH_SECRET, {
        expiresIn: "24h",
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.json({ message: "Login successful", token });
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
};

module.exports = { registerUser, loginUser, logout };
