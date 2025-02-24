const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);  // Base route for authentication
app.use("/api/profile", profileRoutes);

// Connect to MongoDB


mongoose.connect(process.env.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
	console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
	console.log("Mongo DB Connection Successful");
});

module.exports = mongoose;



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
