import User from "../models/User"

const deleteUser = (uid, handleError: (err,docs)=>void)=>{
     User.findByIdAndDelete(uid,handleError)
}


export default deleteUser