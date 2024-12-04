const db = require("../db");

const Review = {
  // Create a new review for a job
  createReview: (job_id, user_id, rating, comment, callback) => {
    const query =
      "INSERT INTO Reviews (job_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(query, [job_id, user_id, rating, comment], callback);
  },

  // Get all reviews for a specific job
  getReviewsByJob: (job_id, callback) => {
    const query = `
    SELECT 
      Reviews.review_id,
      Reviews.rating,
      Reviews.comment,
      Reviews.created_at,
      Users.user_id AS reviewer_id,
      Users.name AS reviewer_name,
      Users.email AS reviewer_email
    FROM 
      Reviews
    INNER JOIN 
      Users
    ON 
      Reviews.user_id = Users.user_id
    WHERE 
      Reviews.job_id = ?;
  `;
    db.query(query, [job_id], callback);
  },

  // Get all reviews by a specific user
  getReviewsByUser: (user_id, callback) => {
    const query = "SELECT * FROM Reviews WHERE user_id = ?";
    db.query(query, [user_id], callback);
  },

  // delete an existing review
  deleteReview: (review_id, user_id, callback) => {
    console.log({ review_id, user_id });

    const query = "DELETE FROM Reviews WHERE review_id = ? AND user_id = ?";
    db.query(query, [review_id, user_id], callback);
  },
};

module.exports = Review;
