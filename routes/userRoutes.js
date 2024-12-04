// routes/userRoutes.js
const express = require("express");
const UserController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Get User by ID (Requires Authentication)
router.get("/profile", authenticateToken, UserController.getUserProfile);

// Get user by ID
router.get("/:user_id", UserController.getUserById);

// Update user details
router.patch("/:user_id", authenticateToken, UserController.updateUser);

// Change user password
router.patch(
  "/:user_id/change-password",
  authenticateToken,
  UserController.changePassword
);

module.exports = router;
