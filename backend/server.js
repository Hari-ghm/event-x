import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userfeedbackRoutes from "./routes/userfeedbackRoutes.js";
import Event from "./models/Event.js"; // ⚠️ Make sure this is imported

dotenv.config();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/feedback", userfeedbackRoutes);

// ⚡ Cloudinary storage for poster uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eventx_posters",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Event creation route (directly on `app`, not `router`)
app.post(
  "/api/events/createEvent",
  upload.single("poster"),
  async (req, res) => {
    try {
      const posterUrl = req.file.path; // Cloudinary returns the URL here
      const event = new Event({ ...req.body, poster: posterUrl });
      await event.save();
      res.status(201).json({ message: "Event created successfully", event });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create event" });
    }
  }
);

app.post("/uploadPoster", upload.single("poster"), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});


// Default route
app.get("/", (req, res) => res.send("Backend is running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
