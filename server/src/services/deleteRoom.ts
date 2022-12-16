import Room from "../models/room"

const deleteRoom = (rid, handleError: (err, docs) => void) => {
      Room.findOneAndDelete({ rid }, handleError)
}

export default deleteRoom