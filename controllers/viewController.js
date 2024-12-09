const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");
const Review = require("../models/reviewModel");
const { format } = require("date-fns");

class ViewsControllers {
  async index(req, res) {
    const { user } = req;
    let jobList = [];

    try {
      jobList = await new Promise((resolve, reject) =>
        Job.getJobs((err, jobs) => {
          if (err) reject(err);
          else resolve(jobs);
        })
      );

      jobList = jobList.map((job) => ({
        ...job,
        isMine: job?.user_id === user?.user_id,
      }));

      const data = {
        user,
        jobList,
      };

      return res.render("pages/index", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error loading jobs");
    }
  }

  async login(req, res) {
    if (req.user) return res.redirect("/");

    return res.render("pages/login");
  }

  async register(req, res) {
    if (req.user) return res.redirect("/");

    res.render("pages/register");
  }

  async createJob(req, res) {
    res.render("pages/create-job");
  }

  async updateJob(req, res) {
    const id = Number(req.params.id);

    const user = req;

    Job.getJobById(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Error updating job" });

      if (Array.isArray(result)) result = result[0];

      if (req.user && req.user.user_id !== result.user_id) {
        return res.redirect("/");
      }

      if (result && result["crated_at"])
        result["created_at"] = format(
          new Date(result["created_at"]),
          "MM/dd/yyyy"
        );

      return res.render("pages/update-job", {
        jobData: result,
      });
    });
  }

  async myCreatedJob(req, res) {
    const { user } = req;
    let jobList = [];

    try {
      jobList = await new Promise((resolve, reject) =>
        Job.getJobsByUserId(user?.user_id, (err, jobs) => {
          if (err) reject(err);
          else resolve(jobs);
        })
      );

      jobList = jobList.map((job) => ({
        ...job,
        isMine: true,
      }));

      const data = {
        user,
        jobList,
      };

      return res.render("pages/my-created-jobs", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error loading jobs");
    }
  }

  async jobById(req, res) {
    const user = req.user;

    const { id: job_id } = req.params;
    try {
      const jobData = (
        await new Promise((resolve, reject) =>
          Job.getJobById(job_id, (err, jobs) => {
            if (err) reject(err);
            else resolve(jobs);
          })
        )
      )[0];

      let reviewList = await new Promise((resolve, reject) =>
        Review.getReviewsByJob(job_id, (err, jobs) => {
          if (err) reject(err);
          else resolve(jobs);
        })
      );

      reviewList = reviewList.map((review) => ({
        ...review,
        isMine: review?.reviewer_id === user?.user_id,
      }));

      console.log(jobData["created_at"]);

      if (jobData["created_at"])
        jobData["created_at"] = format(
          new Date(jobData["created_at"]),
          "MM/dd/yyyy"
        );

      const data = { user, jobData, reviewList };

      return res.render("pages/job", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error loading jobs");
    }
  }

  async applyJob(req, res) {
    const user = req.user;
    const { id: job_id } = req.params;

    const data = { user };

    return res.render("pages/apply", data);
  }

  async myApplications(req, res) {
    const { user } = req;
    let applicationList = [];

    try {
      applicationList = await new Promise((resolve, reject) =>
        Application.getApplicationsByUserId(user?.user_id, (err, jobs) => {
          if (err) reject(err);
          else resolve(jobs);
        })
      );

      const data = {
        user,
        applicationList,
      };

      console.log(data);

      return res.render("pages/my-applications", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error loading jobs");
    }
  }

  async myJobApplications(req, res) {
    const { user } = req;
    let applicationList = [];

    try {
      applicationList = await new Promise((resolve, reject) =>
        Application.getApplicationsOfMyJobs(user?.user_id, (err, jobs) => {
          if (err) reject(err);
          else resolve(jobs);
        })
      );

      const data = {
        user,
        applicationList,
      };

      return res.render("pages/people-who-applied", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error loading jobs");
    }
  }

  async profile(req, res) {
    const { user } = req;

    const data = {
      user,
    };

    return res.render("pages/profile", data);
  }
}

module.exports = new ViewsControllers();
