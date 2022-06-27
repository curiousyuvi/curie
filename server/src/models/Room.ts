import mongoose from "mongoose";

const Message = new mongoose.Schema({
    type: { type: String, default: 'text' },
    content: { type: String, required: true },
    sender: { type: String, required: true }
})

const RoomSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image_url: { type: String },
    admins: [{ type: String }],
    users: [{ type: String }],
    messages: [Message]
})

const Room = mongoose.model('room', RoomSchema);

export default Room;