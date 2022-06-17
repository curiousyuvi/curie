import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    "_id": { type: String, required: true, unique: true },
    "name": { type: String, required: true },
    "state": { type: String, default: "idle" },
    "image_url": { type: String },
    "users": [{ type: String }],
    "messages": [{ type: String }]
})

const Room = mongoose.model('room',RoomSchema);

export default Room;