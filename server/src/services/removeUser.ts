import Room from "../models/Room"

const removeRoom = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $pull: { users: uid } }, handleError)
}

export default removeRoom