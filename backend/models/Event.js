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
  max_team_size: Number,
  organisers: String,
  website_link: String,
  fee: Number,
  total_seats: Number,
  last_date_to_apply: Date,
  prize_pool: mongoose.Schema.Types.Mixed, // can be total or places-wise object
  about: String,
  favourite: { type: [String], default: [] }, // list of usernames interested
  createdBy: String
});



const Event = mongoose.model("Event", eventSchema);
export default Event;
