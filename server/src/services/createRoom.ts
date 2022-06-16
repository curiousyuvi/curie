import Room from "../models/Room"
const createRoom = ({rid,name,username,image_url,state,users,messages}, handleError:(err)=>void)=>{
      const newRoom = new Room({
           _id: rid,
           name,
           state,
           image_url,
           users,
           messages,
      })

      newRoom.save(handleError);
}

export default createRoom