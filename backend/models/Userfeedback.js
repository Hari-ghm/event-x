import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  username: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});


const Userfeedback = mongoose.model("Userfeedback", feedbackSchema);
export default Userfeedback;