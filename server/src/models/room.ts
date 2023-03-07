import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  rid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image_url: { type: String },
  last_track_id: { type: String, default: "TMSIR210mRg" },
  last_track_thumbnail: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png",
  },
  last_track_name: { type: String, default: "Love Yourself - Justin Bieber" },
  last_track_channel: { type: String, default: "JustinBieberVevo" },
  last_track_playing: { type: Boolean, default: false },
  last_track_progress: { type: Number, default: 0 },
  last_track_timestamp: { type: Number, default: 0 },
});

const Room = mongoose.model("room", RoomSchema);

export default Room;
