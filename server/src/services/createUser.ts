import User from "../models/User";

const createUser = ({ uid, name, username, status, rooms, avatar_url }, handleError: (err) => void) => {
    const newUser = new User({
        _id: uid,
        name,
        username,
        status,
        rooms,
        avatar_url
    });

    newUser.save(handleError);






}

export default createUser