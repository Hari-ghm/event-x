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

export default router;
