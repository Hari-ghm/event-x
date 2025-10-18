import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  about: { type: String },
  interested: { type: [String], default: [] },
  viewCount: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
export default User;
