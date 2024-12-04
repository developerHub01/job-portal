const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middlewares/authMiddleware");

// Route to create a new review for a job
router.post("/", authenticateToken, reviewController.createReview);

// Route to get reviews for a specific job
router.get("/job/:job_id", reviewController.getReviewsByJob);

// Route to get all reviews by a specific user
router.get("/user/:user_id", reviewController.getReviewsByUser);

router.get("/delete/:id", reviewController.deleteReview);

module.exports = router;
