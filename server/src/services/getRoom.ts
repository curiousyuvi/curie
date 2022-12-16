import Room from "../models/room";

const getRoom = (rid, handleError: (err, docs) => void) => {
      Room.findOne({ rid }, handleError);
}

export default getRoom