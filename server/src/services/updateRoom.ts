import Room from "../models/Room"

const updateRoom = (rid, body, handleError: (err, docs) => void) => {
      Room.findByIdAndUpdate(rid, body, handleError)
}

export default updateRoom