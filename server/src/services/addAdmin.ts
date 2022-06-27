import Room from "../models/Room"

const addAdmin = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $addToSet: { admins: uid } }, handleError)
}

export default addAdmin