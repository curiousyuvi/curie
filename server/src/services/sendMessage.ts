import Room from "../models/Room"

const sendMessage = (rid, body, handleError: (err) => void) => {
      const newMessage = body;

      Room.findByIdAndUpdate(rid, { $push: { messages: newMessage } }, handleError)

}

export default sendMessage