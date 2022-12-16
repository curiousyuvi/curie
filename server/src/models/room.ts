import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    rid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image_url: { type: String },
})

const Room = mongoose.model('room', RoomSchema);

export default Room