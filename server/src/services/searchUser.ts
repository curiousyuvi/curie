import User from "../models/User";

const searchUser = (username: string, strict, handleError: (err, docs) => void) => {
    const regexp = strict ? username : new RegExp("^" + username);
    User.find({ username: regexp }, handleError);
}

export default searchUser