const Job = require("../models/jobModel");

const createJob = (req, res) => {
  const { user } = req;
  const { user_id } = user;

  const { title, description, location } = req.body;

  let salary = Number(req.body.salary);

  Job.createJob(
    title,
    description,
    location,
    salary,
    user_id,
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error creating job" });

      res
        .status(201)
        .json({ success: true, message: "Job created successfully" });
    }
  );
};

const updateJob = (req, res) => {
  const { id: job_id } = req.params;
  const { title, description, location } = req.body;

  let salary = Number(req.body.salary);

  const user_id = req.params.id;

  Job.updateJob(
    job_id,
    user_id,
    title,
    description,
    location,
    salary,
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error updating job" });

      res
        .status(201)
        .json({ success: true, message: "Job updated successfully" });
    }
  );
};

const deleteJob = (req, res) => {
  const { id: job_id } = req.params;

  const user_id = req.user?.user_id;

  Job.deleteJob(job_id, user_id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Error updating job" });

    return res.redirect("/");
  });
};

const getJobs = (req, res) => {
  Job.getJobs((err, jobs) => {
    if (err) return res.status(500).json({ message: "Error fetching jobs" });

    res.status(200).json(jobs);
  });
};

module.exports = { createJob, updateJob, deleteJob, getJobs };
