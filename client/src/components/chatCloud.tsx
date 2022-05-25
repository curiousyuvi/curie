import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Message } from "../models/Message";

const ChatCloud: FC<{ message: Message }> = ({ message }) => {
  const formatDateTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getHours()}:${d.getMinutes()}`;
  };
  return (
    <div className="w-full flex items-start my-2">
      <FaUserCircle className="mr-2 text-3xl" />
      <div className="w-full flex flex-col items-start">
        <div className="max-w-[70%] px-2 py-1 bg-gray-500/50 rounded-lg">
          <span>{message.text}</span>
        </div>
        <span className="text-sm text-gray-400 ml-1 mt-1">
          {formatDateTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatCloud;
