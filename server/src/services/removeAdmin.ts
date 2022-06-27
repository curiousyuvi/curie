import Room from "../models/Room"

const removeAdmin = (rid, uid, handleError: (err) => void) => {
    Room.findByIdAndUpdate(rid, { $pull: { admins: uid } }, handleError)
}

export default removeAdmin