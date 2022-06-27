import Room from "../models/Room"

const removeUser = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $pull: { users: uid } }, handleError)
}

export default removeUser