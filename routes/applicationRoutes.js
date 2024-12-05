const express = require("express");
const {
  applyForJob,
  deleteApplication,
} = require("../controllers/applicationController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", authenticateToken, applyForJob);

router.get("/delete/:id", authenticateToken, deleteApplication);

module.exports = router;
