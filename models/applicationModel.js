const db = require("../db");

const Application = {
  applyForJob: (job_id, user_id, callback) => {
    const query = "INSERT INTO Applications (job_id, user_id) VALUES (?, ?)";
    db.query(query, [job_id, user_id], callback);
  },

  getApplicationsByJobId: (job_id, callback) => {
    const query = "SELECT * FROM Applications WHERE job_id = ?";
    db.query(query, [job_id], callback);
  },

  getApplicationsByUserId: (user_id, callback) => {
    const query = "SELECT * FROM Applications WHERE user_id = ?";
    db.query(query, [user_id], callback);
  },
};

module.exports = Application;
