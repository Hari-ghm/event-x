import express from "express";
import Userfeedback from "../models/Userfeedback.js";

const router = express.Router();

router.post("/userfeedback", async (req, res) => {
  try {
    const { username, message } = req.body;
    console.log(req.body)

    // Basic validation
    if (!username || !message) {
      return res
        .status(400)
        .json({ error: "Username and message are required" });
    }

    const newFeedback = new Userfeedback({
      username,
      message,
      createdAt: new Date(), // optional if your schema already has timestamps
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

export default router;
