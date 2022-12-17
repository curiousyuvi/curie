import React from "react";
import { Message } from "../interfaces/Message";

const ChatNotification = ({ message }: { message: Message }) => {
  return (
    <div className="w-full flex justify-center text-sm my-1">
      <span className="py-1 px-2 bg-white/10 text-gray-300 rounded-lg">
        {message.content}
      </span>
    </div>
  );
};

export default ChatNotification;
