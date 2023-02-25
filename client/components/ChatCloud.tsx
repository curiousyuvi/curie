import { FC } from "react";
import { useSelector } from "react-redux";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import { Message } from "../interfaces/Message";
import { RootState } from "../store";

const ChatCloud: FC<{ message: Message }> = ({ message }) => {
  const { dateFromMid, formatTime } = useDateTimeHelper();
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div
      className={`w-full flex items-end my-2 ${
        !(message.senderUid === currentUser?.uid)
          ? ""
          : "flex-row-reverse justify-end"
      }`}
    >
      <img
        src={message.senderAvatar}
        alt="avatar"
        className={`mb-[1.25rem] h-8 rounded-full ${
          !(message.senderUid === currentUser?.uid) ? "mr-2" : "ml-2"
        }`}
      />
      <div
        className={`w-full flex flex-col  ${
          !(message.senderUid === currentUser?.uid)
            ? "items-start"
            : "items-end"
        }`}
      >
        <div
          className={`max-w-[calc(70%)] min-w-[4rem] px-3 py-2 border border-indigo-300/20 rounded-lg flex flex-col items-start justify-start ${
            !(message.senderUid === currentUser?.uid)
              ? "bg-indigo-500/30 rounded-bl-none"
              : "bg-indigo-500/80 rounded-br-none"
          }`}
        >
          <span
            className={`${
              !(message.senderUid === currentUser?.uid)
                ? "text-indigo-400"
                : "hidden"
            } text-sm font-medium`}
          >
            {message.senderName}
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
