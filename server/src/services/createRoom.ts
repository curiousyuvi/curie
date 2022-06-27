import Room from "../models/Room"
const createRoom = ({ rid, name, username, image_url, admins, state, users, messages }, handleError: (err) => void) => {
      const newRoom = new Room({
            _id: rid,
            name,
            image_url,
            admins,
            users,
            messages,
      })

      newRoom.save(handleError);
}

export default createRoom