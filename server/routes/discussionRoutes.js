const express = require("express");
const router = express.Router();
const Discussion = require("../models/Discussion");
const Reply = require("../models/Reply");
const Like = require("../models/Like");

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().populate("author", "fullName");
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
});

// Create a new discussion
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const discussion = new Discussion({ title, content, author });
    await discussion.save();
    res.status(201).json({ message: "Discussion created", discussion });
  } catch (error) {
    res.status(500).json({ message: "Error creating discussion", error });
  }
});

// Get a single discussion with replies
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id).populate("author", "fullName");
    const replies = await Reply.find({ discussion: req.params.id }).populate("author", "fullName");
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });
    res.status(200).json({ discussion, replies });
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussion", error });
  }
});

// Delete a discussion
router.delete("/:id", async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    await Reply.deleteMany({ discussion: req.params.id });
    await Like.deleteMany({ targetId: req.params.id });
    res.status(200).json({ message: "Discussion deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting discussion", error });
  }
});

module.exports = router;
