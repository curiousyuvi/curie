import Room from "../models/room";

const createRoom = ({ rid, name, image_url }, handleError: (err) => void) => {
      const newRoom = new Room({
            rid,
            name,
            image_url,
      })

      newRoom.save(handleError);
}

export default createRoom