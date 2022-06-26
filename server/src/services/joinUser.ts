import Room from "../models/Room"

const joinRoom = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $addToSet: { users: uid } }, handleError)
}

export default joinRoom