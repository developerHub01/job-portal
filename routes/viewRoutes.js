const express = require("express");
const ViewsControllers = require("../controllers/viewController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", ViewsControllers.index);

router.get("/login", ViewsControllers.login);

router.get("/register", ViewsControllers.register);

router.get(
  "/create-job",
  authenticateToken,
  authenticateToken,
  ViewsControllers.createJob
);

router.get(
  "/update-job/:id",
  authenticateToken,
  authenticateToken,
  ViewsControllers.updateJob
);

router.get("/my-created-job", authenticateToken, ViewsControllers.myCreatedJob);

router.get("/job/:id", ViewsControllers.jobById);

router.get("/apply/:id", authenticateToken, ViewsControllers.applyJob);

router.get(
  "/my-applications",
  authenticateToken,
  ViewsControllers.myApplications
);

router.get(
  "/my-job-application",
  authenticateToken,
  ViewsControllers.myJobApplications
);

module.exports = router;
