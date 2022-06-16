import Room from "../models/Room"
import User from "../models/User"

const updateRoom = (rid, body, handleError: (err,docs)=>void)=>{
      Room.findByIdAndUpdate(rid,body,handleError)
}

export default updateRoom