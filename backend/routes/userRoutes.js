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


export default router;