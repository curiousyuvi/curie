import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    status: { type: String, default: "😎 vibing" },
    avatar_url: { type: String},
    rooms: [{ type: String }]
});

const User = mongoose.model('user', UserSchema);

export default User;