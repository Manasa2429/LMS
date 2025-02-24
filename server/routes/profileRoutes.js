const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Import mongoose
const User = require("../models/User");

// Route to fetch personal info
router.get("/personal-info/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Ensure `userId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // ✅ Convert `userId` to `ObjectId` before querying
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      dob: user.dob ? user.dob.toISOString().split("T")[0] : null,
      gender: user.gender,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching personal info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
