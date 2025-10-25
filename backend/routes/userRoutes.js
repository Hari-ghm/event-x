import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password} = req.body;

    const existingUser = await User.findOne({ username });
  
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });
      

    const newUser = new User({ username, password});
    
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// get user details for profile
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne({ username }); // assuming Mongoose
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
    
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update profiel details
router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { phone, email, about, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { phone, email, about, password },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.post("/addInterested", async (req, res) => {
  try {
    const { username, eventId } = req.body;

    if (!username || !eventId) {
      return res
        .status(400)
        .json({ error: "Username and eventId are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("QR")
    // Check if already interested
    if (user.interested.includes(eventId)) {
      return res
        .status(200)
        .json({ message: "Event already added to interested list" });
    }

    // Add eventId to interested list
    user.interested.push(eventId);
    await user.save();

    res
      .status(200)
      .json({ message: "Event added to interested list successfully!" });
  } catch (err) {
    console.error("Error adding interested event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/removeInterested", async (req, res) => {
  try {
    const { username, eventId } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.interested = user.interested.filter((id) => id.toString() !== eventId);
    await user.save();

    res.status(200).json({ message: "Event removed from interested list" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user's interested events
router.get("/getInterested/:username", async (req,res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ interested: user.interested });
  } catch (error) {
    console.error("Error fetching interested events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;