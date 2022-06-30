import { FC } from "react";
import useAuth from "../hooks/useAuth";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import useRoom from "../hooks/useRoom";
import { Message } from "../interfaces/Message";

const ChatCloud: FC<{ message: Message }> = ({ message }) => {
  const { userShorts } = useRoom();
  const { user } = useAuth();
  const getUserShort = (uid: string) => {
    return userShorts.find((e) => e.uid === uid);
  };

  const { dateFromMid, formatTime } = useDateTimeHelper();

  return (
    <div className="w-full flex items-start my-2">
      <img
        src={getUserShort(message.sender)?.avatar_url}
        alt="avatar"
        className="mr-2 h-8 rounded-full"
      />
      <div className="w-full flex flex-col items-start">
        <div
          className={`max-w-[calc(70%)] min-w-[4rem] px-3 py-2 ${
            !(message.sender === user?.uid)
              ? "bg-indigo-500/30"
              : "bg-indigo-500/80"
          } border border-indigo-300/20 rounded-lg rounded-bl-none flex flex-col items-start justify-start`}
        >
          <span
            className={`${
              !(message.sender === user?.uid) ? "text-indigo-400" : "hidden"
            } text-sm font-medium`}
          >
            {getUserShort(message.sender)?.name}
          </span>
          <p className="w-full text-gray-200">{message.content}</p>
        </div>
        <span className="text-sm text-gray-400 ml-1">
          {formatTime(dateFromMid(message?.mid || ""))}
        </span>
      </div>
    </div>
  );
};

export default ChatCloud;
