import { Message } from "../interfaces/Message";
import Room from "../models/Room"

const sendMessage = (rid: string, body: Message, handleError: (err) => void) => {
      const newMessage = body;

      Room.findByIdAndUpdate(rid, { $push: { messages: newMessage } }, handleError)

}

export default sendMessage