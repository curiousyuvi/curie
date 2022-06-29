import mongoose from "mongoose";

const Message = new mongoose.Schema({
    type: { type: String, default: 'text' },
    content: { type: String, required: true },
    sender: { type: String, required: true }
})

export default Message