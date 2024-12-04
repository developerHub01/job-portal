const express = require("express");
const ViewsControllers = require("../controllers/viewController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", ViewsControllers.index);

router.get("/login", ViewsControllers.login);

router.get("/register", ViewsControllers.register);

router.get("/create-job", authenticateToken, ViewsControllers.createJob);

router.get("/update-job/:id", authenticateToken, ViewsControllers.updateJob);

router.get("/my-created-job", ViewsControllers.myCreatedJob);

router.get("/job/:id", ViewsControllers.jobById);

module.exports = router;
