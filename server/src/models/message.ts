import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  rid: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "notification", "music"],
    required: true,
  },
  content: { type: String, required: true },
  senderName: { type: String, required: true },
  senderAvatar: { type: String, required: true },
  senderUid: { type: String, required: true },
});

const Message = mongoose.model("message", MessageSchema);

export default Message;
