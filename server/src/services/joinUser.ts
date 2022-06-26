import Room from "../models/Room"

const joinUser = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $addToSet: { users: uid } }, handleError)
}

export default joinUser