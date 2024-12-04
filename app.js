const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const viewRoutes = require("./routes/viewRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const cookieParser = require("cookie-parser");
const partials = require("express-partials");
const readTokenMiddleware = require("./middlewares/readToken");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (e.g., CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, "public"))); // Ensure public folder is correctly resolved

// View Engine
app.set("view engine", "ejs");
app.use(partials());
app.set("views", path.join(__dirname, "views")); // Views folder is correctly set
app.use(bodyParser.json());

app.use(readTokenMiddleware);

app.use("/", viewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
