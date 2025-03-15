const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

// Like a discussion or reply
const User = require("../models/User"); // Ensure this file exists
const Discussion = require("../models/Discussion"); // Ensure this file exists



// Like a discussion or reply
// Like a discussion
router.post("/", async (req, res) => {
    try {
        const { targetId, user } = req.body;  // Make sure frontend sends correct fields

        // Find the discussion
        const discussion = await Discussion.findById(targetId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        // Prevent duplicate likes
        if (discussion.likes.includes(user)) {
            return res.status(400).json({ message: "Already liked", likesCount: discussion.likes.length });
        }

        // Add like
        discussion.likes.push(user);
        await discussion.save();

        res.json({ message: "Liked successfully", likesCount: discussion.likes.length });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get like count
router.get("/:targetId/likes", async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.targetId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }
        res.json({ likesCount: discussion.likes.length });
    } catch (error) {
        res.status(500).json({ message: "Error fetching likes", error });
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
