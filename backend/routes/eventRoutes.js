import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Route to create event
router.post("/createEvent", async (req, res) => {
  try {
    const { username, ...rest } = req.body;

    const event = new Event({
      ...rest,
      createdBy: username, // map frontend username → createdBy in DB
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save event" });
  }
});


// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// GET all events
router.get("/getEvents", async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/events/:id  → Fetch event by ObjectId
router.get("/getEvent/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add discussion to event
router.post("/addDiscussion", async (req, res) => {
  const { eventId, username, message, isTeamSearch, about } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const newDiscussion = {
      username,
      message,
      date: new Date(),
      isTeamSearch,
      about,
    };

    event.discussions.push(newDiscussion);
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add discussion" });
  }
});

router.post("/deleteDiscussion", async (req, res) => {
  const { eventId, discussionId, username } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const discussion = event.discussions.id(discussionId);
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });

    // Only allow the same user to delete their discussion
    if (discussion.username !== username)
      return res.status(403).json({ error: "Not authorized to delete this" });

    discussion.deleteOne();
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete discussion" });
  }
});

// Get events created by a specific user
router.get("/getEventsByUser/:username", async (req, res) => {
  const { username } = req.params;
  
  try {
    const events = await Event.find({ createdBy: username });
    res.json(events);
  } catch (err) {
    console.error("Error fetching user events:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an event
router.delete("/deleteEvent/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { username } = req.body;
  
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    // Check if the user is the creator of the event
    if (event.createdBy !== username) {
      return res.status(403).json({ error: "Unauthorized to delete this event" });
    }
    
    await Event.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
    
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
