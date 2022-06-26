import User from "../models/User"

const removeRoom = (uid, rid, handleError: (err) => void) => {
    User.findByIdAndUpdate(uid, { $pull: { rooms: rid } }, handleError)
}

export default removeRoom