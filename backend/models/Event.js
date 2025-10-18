import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  category: String,
  poster: String,
  datetime: Date,
  venue: String,
  max_team_size: Number,
  organisers: String,
  website_link: String,
  fee: Number,
  total_seats: Number,
  last_date_to_apply: Date,
  prize_pool: mongoose.Schema.Types.Mixed, // can be total or places-wise object
  about: String,
  interested: { type: [String], default: [] }, // list of usernames interested
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
