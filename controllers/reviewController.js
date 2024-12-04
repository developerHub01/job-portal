const Review = require("../models/reviewModel");

const createReview = (req, res) => {
  const { user_id } = req.user;
  const { job_id, rating, comment } = req.body;

  // Basic validation for rating
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  // Insert the review into the database
  Review.createReview(job_id, user_id, rating, comment, (err, result) => {
    if (err) return res.status(500).json({ message: "Error creating review" });

    return res.redirect(`/job/${job_id}`);
  });
};

const getReviewsByJob = (req, res) => {
  const { job_id } = req.params;

  // Fetch reviews for a specific job
  Review.getReviewsByJob(job_id, (err, reviews) => {
    if (err) return res.status(500).json({ message: "Error fetching reviews" });

    res.status(200).json(reviews);
  });
};

const getReviewsByUser = (req, res) => {
  const { user_id } = req.params;

  // Fetch reviews by a specific user
  Review.getReviewsByUser(user_id, (err, reviews) => {
    if (err) return res.status(500).json({ message: "Error fetching reviews" });

    res.status(200).json(reviews);
  });
};

const deleteReview = (req, res) => {
  const { user_id } = req.user;

  const { id: review_id } = req.params;

  // Update the review in the database
  Review.deleteReview(review_id, user_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating review" });

    return res.redirect("back");
  });
};

module.exports = {
  createReview,
  getReviewsByJob,
  getReviewsByUser,
  deleteReview,
};
