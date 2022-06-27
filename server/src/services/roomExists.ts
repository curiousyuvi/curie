import Room from "../models/Room"

const roomExists = (rid, handleError: (err, count) => void) => {
    Room.countDocuments({ _id: rid }, handleError)
}

export default roomExists