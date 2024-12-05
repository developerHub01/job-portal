// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const updateUser = (req, res) => {
  const { name, email } = req.body;

  const { user_id } = req.user;

  User.updateUser(user_id, name, email, (err, result) => {
    console.log({ err, result });

    if (err) {
      return res.status(500).json({ message: "Error updating user" });
    }
    return res.redirect("back");
  });
};

const changePassword = (req, res) => {
  const { newPassword } = req.body;

  const { user_id } = req.user; // Assuming the user ID is available from the authentication middleware
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    User.changePassword(user_id, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error changing password" });
      }
      return res.redirect("back");
    });
  });
};

// Get user by ID
const getUserById = (req, res) => {
  const { user_id } = req.params;

  User.getUserById(user_id, (err, user) => {
    if (err || !user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  });
};

const getUserProfile = (req, res) => {
  const user_id = req.user.user_id;

  User.getUserById(user_id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user data" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  });
};

module.exports = { getUserProfile, getUserById, updateUser, changePassword };
