import Room from "../models/Room"

const getRoomShort = (rid, handleError: (err, docs) => void) => {
    Room.findById(rid, handleError).select({ messages: 0, users: 0 });
}

export default getRoomShort