const db = require("../db");

const Job = {
  createJob: (title, description, location, salary, user_id, callback) => {
    const query =
      "INSERT INTO Jobs (title, description, location, salary, user_id) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [title, description, location, salary, user_id], callback);
  },

  getJobs: (callback) => {
    const query = "SELECT * FROM Jobs";
    db.query(query, callback);
  },

  getJobsByUserId: (user_id, callback) => {
    const query = "SELECT * FROM Jobs WHERE user_id = ?";
    db.query(query, [user_id], callback);
  },

  getJobById: (job_id, callback) => {
    const query = `
    SELECT 
      Jobs.*,
      Users.name AS posted_by_name,
      Users.email AS posted_by_email
    FROM Jobs
    INNER JOIN Users ON Jobs.user_id = Users.user_id
    WHERE Jobs.job_id = ?
  `;
    db.query(query, [job_id], callback);
  },

  // Method to update a job by ID
  updateJob: (
    job_id,
    user_id,
    title,
    description,
    location,
    salary,
    callback
  ) => {
    const query =
      "UPDATE Jobs SET title = ?, description = ?, location = ?, salary = ? WHERE job_id = ? AND user_id = ?";
    db.query(
      query,
      [title, description, location, salary, job_id, user_id],
      callback
    );
  },

  // Method to delete a job by job_id and user_id
  deleteJob: (job_id, user_id, callback) => {
    console.log({ job_id, user_id });

    const query = "DELETE FROM Jobs WHERE job_id = ? AND user_id = ?";
    db.query(query, [job_id, user_id], callback);
  },
};

module.exports = Job;
