import mongoose from "mongoose";
const default_avatar_url = 'https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1655202621~hmac=9bb899e3e03a78f91ad09f2e171fa7e7'

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    status: { type: String, default: "😎 vibing" },
    avatar_url: { type: String, default: default_avatar_url },
    rooms: [{ type: String }]
});

const User = mongoose.model('user', UserSchema);

export default User;