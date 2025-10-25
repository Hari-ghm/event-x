import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  category: String,
  poster: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  venue: String,
  maxTeamSize: Number,
  organiser: String,
  website: String,
  fee: Number,
  feeType: String,
  totalSeats: Number,
  lastDateToApply: String,
  prizePool: mongoose.Schema.Types.Mixed, // can be total or places-wise object
  about: String,
  favourite: { type: [String], default: [] }, // list of usernames interested
  createdBy: String,
  discussions: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      username: String,
      message: String,
      date: { type: Date, default: Date.now },
      isTeamSearch: { type: Boolean, default: false },
      about: { type: String, default: "" },
    },
  ],
});



const Event = mongoose.model("Event", eventSchema);
export default Event;
