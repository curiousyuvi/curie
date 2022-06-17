import Room from "../models/Room"

const getRoom = (rid, handleError: (err,docs) =>void)=>{
      Room.findById(rid,handleError);
}

export default getRoom