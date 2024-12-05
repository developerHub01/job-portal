const db = require("../db");

const Application = {
  applyForJob: (job_id, user_id, resume_url, cover_letter, callback) => {
    const query =
      "INSERT INTO Applications (job_id, user_id, resume_url, cover_letter) VALUES (?, ?, ?, ?)";
    db.query(query, [job_id, user_id, resume_url, cover_letter], callback);
  },

  getApplicationsByJobId: (job_id, callback) => {
    const query = "SELECT * FROM Applications WHERE job_id = ?";
    db.query(query, [job_id], callback);
  },

  getApplicationsByUserId: (user_id, callback) => {
    const query = `
    SELECT 
      Applications.application_id, 
      Applications.user_id, 
      Applications.resume_url, 
      Applications.cover_letter, 
      Applications.applied_at,
      Jobs.job_id,
      Jobs.title,
      Jobs.description,
      Jobs.location,
      Jobs.salary,
      Jobs.created_at AS job_created_at
    FROM Applications
    JOIN Jobs ON Applications.job_id = Jobs.job_id
    WHERE Applications.user_id = ?;
  `;
    db.query(query, [user_id], callback);
  },

  deleteApplicationById: (application_id, user_id, callback) => {
    const query =
      "DELETE FROM Applications WHERE application_id = ? AND user_id = ?";
    db.query(query, [application_id, user_id], callback);
  },

  getApplicationsOfMyJobs: (user_id, callback) => {
    const query = `
      SELECT 
        Applications.application_id, 
        Applications.user_id AS applicant_id, 
        Applications.resume_url, 
        Applications.cover_letter, 
        Applications.applied_at,
        Jobs.job_id,
        Jobs.title AS job_title,
        Jobs.description AS job_description,
        Jobs.location AS job_location,
        Jobs.salary AS job_salary,
        Jobs.created_at AS job_created_at,
        Users.name AS applicant_name,
        Users.email AS applicant_email
      FROM Applications
      INNER JOIN Jobs ON Applications.job_id = Jobs.job_id
      INNER JOIN Users ON Applications.user_id = Users.user_id
      WHERE Jobs.user_id = ?
      ORDER BY Applications.applied_at DESC;
    `;
    db.query(query, [user_id], callback);
  },
};

module.exports = Application;
