const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollRoutes");
const assessmentRoutes = require("./routes/assessmentsRoutes");  // Added assessment routes
const submissionRoutes = require("./routes/submissionsRoutes");  // Added submission routes
const discussionRoutes = require("./routes/discussionRoutes");
const replyRoutes = require("./routes/replyRoutes");
const likeRoutes = require("./routes/likeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use(enrollmentRoutes);
app.use("/api/assessments", assessmentRoutes);  // Added route for assessments
app.use("/api/submissions", submissionRoutes);  // Added route for submissions
app.use("/api/discussions", discussionRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/likes", likeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
    console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
    console.log("MongoDB Connection Successful");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = mongoose;
