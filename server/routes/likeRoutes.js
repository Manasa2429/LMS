const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

// Like a discussion or reply
router.post("/", async (req, res) => {
  try {
    const { user, targetId, targetType } = req.body;
    const like = new Like({ user, targetId, targetType });
    await like.save();
    res.status(201).json({ message: "Liked successfully", like });
  } catch (error) {
    res.status(500).json({ message: "Error liking", error });
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
