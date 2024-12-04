const express = require("express");
const {
  createJob,
  updateJob,
  getJobs,
  deleteJob,
} = require("../controllers/jobController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authenticateToken, createJob);

router.patch("/update/:id", authenticateToken, updateJob);

router.get("/", getJobs);

router.get("/delete/:id", authenticateToken, deleteJob);

module.exports = router;
