import User from "../models/User"

const joinRoom = (uid, rid, handleError: (err) => void) => {
    User.findByIdAndUpdate(uid, { $addToSet: { rooms: rid } }, handleError)
}

export default joinRoom