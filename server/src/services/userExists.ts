import User from "../models/User"

const userExists = (uid, handleError: (err, count) => void) => {
    User.countDocuments({ _id: uid }, handleError)
}

export default userExists