import Message from "../models/message";

const postMessage = (body, handleError: (err) => void) => {
  const newMessage = new Message(body);

  newMessage.save(handleError);
};

export default postMessage;
