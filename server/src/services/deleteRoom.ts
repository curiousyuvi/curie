import Room from "../models/Room"

const deleteRoom = (rid, handleError:(err,docs)=>void)=>{
      Room.findByIdAndDelete(rid,handleError)
}

export default deleteRoom