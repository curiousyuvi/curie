import { useEffect, useRef, useState } from "react";
import { Message } from "../interfaces/Message";
import { useNavigate, useParams } from "react-router-dom";
import ChatCloud from "../components/ChatCloud";
import ChatTextField from "../components/ChatTextField";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import useRoom from "../hooks/useRoom";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import ChatNotification from "../components/ChatNotification";
import ChatDateRule from "../components/ChatDateRule";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import Music from "../components/Music";
import useSocket from "../hooks/useSocket";

export default function ChatRoom() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sendMessage } = useMessage();
  const { midFromDate, dateFromMid, formatDate } = useDateTimeHelper();
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const handleOnSend = (value: string) => {
    setMessages([
      ...messages,
      {
        mid: midFromDate(new Date()),
        type: "text",
        content: value,
        sender: user?.uid || "",
      },
    ]);

    sendMessage(
      { type: "text", content: value, sender: user?.uid || "" },
      room.rid
    );
  };
  const { room } = useRoom();
  const params = useParams();

  const scrollToBottom = () => {
    messagesSectionRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    room?.messages && setMessages(room.messages);
  }, [room]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleOptionsClick = () => {
    navigate(`/${params.rid}/details`);
  };

  const [messageList, setMessageList] = useState<any>([]);

  const newDayMessage = (prevMessage: Message, newMessage: Message) => {
    return (
      dateFromMid(prevMessage.mid || "").getDate() !==
      dateFromMid(newMessage.mid || "").getDate()
    );
  };

  const createMessageList = () => {
    let newMessageList: any[] = [];

    messages.forEach((message, i) => {
      if (i === 0 || newDayMessage(messages[i - 1], message)) {
        newMessageList.push(
          <ChatDateRule
            key={i}
            date={formatDate(dateFromMid(message?.mid || ""))}
          />
        );
      }
      if (message.type === "text")
        newMessageList.push(<ChatCloud key={message.mid} message={message} />);
      else if (message.type === "notification")
        return newMessageList.push(
          <ChatNotification key={message.mid} message={message} />
        );
    });

    setMessageList(newMessageList);
  };

  useEffect(() => {
    createMessageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 border-b border-indigo-300/30 bg-blue-900/90 px-2 py-1 flex items-center">
        <button
          className="text-2xl hover:text-white duration-100 sm:hidden"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <img
          alt="room"
          src={room?.image_url}
          className="h-10 rounded-full mx-2"
        />
        <h2>{room?.name}</h2>
        <button
          onClick={handleOptionsClick}
          className="ml-auto text-2xl p-2 hover:bg-white/10 rounded-full group duration-100"
        >
          <IoEllipsisVerticalOutline className="group-hover:hidden" />
          <IoEllipsisVertical className="hidden group-hover:flex text-white" />
        </button>
      </div>
      <div className="h-full bg-blue-900/70 w-full p-4 flex flex-col justify-between relative">
        <div className="w-full h-[calc(100vh-16.5rem)] flex flex-col overflow-x-hidden overflow-y-scroll mb-2 relative">
          {messageList}
          <div ref={messagesSectionRef} />
        </div>
        <ChatTextField onSend={handleOnSend} />
        <Music
          musicModalOpen={musicModalOpen}
          setMusicModalOpen={setMusicModalOpen}
        />
      </div>
    </div>
  );
}
