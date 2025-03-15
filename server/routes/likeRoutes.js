const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

// Like a discussion or reply
const User = require("../models/User"); // Ensure this file exists
const Discussion = require("../models/Discussion"); // Ensure this file exists

router.post("/", async (req, res) => {
  try {
    const { user, targetId, targetType } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the target exists
    const targetModel = targetType === "Discussion" ? Discussion : Reply;
    const targetExists = await targetModel.findById(targetId);
    if (!targetExists) {
      return res.status(404).json({ message: `${targetType} not found` });
    }

    const like = new Like({ user, targetId, targetType });
    await like.save();
    res.status(201).json({ message: "Liked successfully", like });
  } catch (error) {
    console.error("Error liking:", error);
    res.status(500).json({ message: "Error liking", error: error.message });
  }
});

  

// Unlike a discussion or reply
router.delete("/", async (req, res) => {
  try {
    const { user, targetId } = req.body;
    await Like.findOneAndDelete({ user, targetId });
    res.status(200).json({ message: "Unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking", error });
  }
});

module.exports = router;
