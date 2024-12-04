const Application = require("../models/applicationModel");

const applyForJob = (req, res) => {
  const { job_id, user_id } = req.body;

  Application.applyForJob(job_id, user_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error applying for job" });

    res.status(201).json({ message: "Application submitted successfully" });
  });
};

module.exports = { applyForJob };
