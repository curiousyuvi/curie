import User from "../models/User";

const getUser = (uid, handleError: (err,docs) => void) => {

    User.findById(uid,handleError)




}

export default getUser