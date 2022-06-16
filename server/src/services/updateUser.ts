import User from "../models/User"

const updateUser = (uid, body, handleError: (err,docs)=>void)=>{
      User.findByIdAndUpdate(uid,body,handleError)
}

export default updateUser