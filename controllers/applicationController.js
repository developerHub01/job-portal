const Application = require("../models/applicationModel");

const applyForJob = (req, res) => {
  const { user_id } = req?.user;
  const { job_id, resume_url, cover_letter } = req.body;

  Application.applyForJob(
    job_id,
    user_id,
    resume_url,
    cover_letter,
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error applying for job" });

      res
        .status(201)
        .json({ success: true, message: "Application submitted successfully" });
    }
  );
};
const deleteApplication = (req, res) => {
  const { user_id } = req?.user;
  const { id: application_id } = req.params;

  console.log({
    user_id,
    application_id,
  });

  Application.deleteApplicationById(application_id, user_id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Error applying for job" });

    return res.redirect("back");
  });
};

module.exports = { applyForJob, deleteApplication };
