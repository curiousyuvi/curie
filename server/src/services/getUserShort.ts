import User from "../models/User";

const getUserShort = (uid, handleError: (err, docs) => void) => {
    User.findById(uid, handleError).select({ rooms: 0 })
}

export default getUserShort