import { useEffect, useRef, useState } from "react";
import { Message } from "../interfaces/Message";
import { useNavigate, useParams } from "react-router-dom";
import { Room } from "../interfaces/Room";
import useRoom from "../hooks/useRoom";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import ChatCloud from "../components/ChatCloud";
import ChatTextField from "../components/ChatTextField";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";

export default function ChatRoom() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const generatePlaceholderAvatar = usePlaceholderAvatar();
  const placeholderAvatar = generatePlaceholderAvatar();
  const [messages, setMessages] = useState<Message[]>([]);
  const { joinRoom } = useUser();
  const { joinUser } = useRoom();
  const { loadUser } = useAuth();
  const navigate = useNavigate();
  const handleOnSend = (value: string) => {
    setMessages([...messages, { type: "text", content: value, sender: "" }]);
  };
  const [room, setRoom] = useState<Room>({
    name: "Curie Room",
    rid: "curierid",
    image_url: placeholderAvatar,
    users: [],
    messages: [],
  });
  const params = useParams();
  const { getRoom } = useRoom();

  const scrollToBottom = () => {
    messagesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const uid = localStorage.getItem("UID");
    if (params.rid && uid) {
      getRoom(params.rid).then((data) => {
        if (data) setRoom(data);
      });
      joinRoom(uid, params.rid);
      joinUser(params.rid, uid);
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.rid]);

  useEffect(() => {
    room?.messages && setMessages(room.messages);
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleOptionsClick = () => {
    navigate(`/${params.rid}/details`);
  };

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
      <div className="h-full bg-blue-900/70 w-full p-4 flex flex-col justify-between">
        <div className="w-full h-[calc(100vh-16.5rem)] flex flex-col overflow-x-hidden overflow-y-scroll mb-2 relative">
          {messages?.map((message) => {
            return <ChatCloud message={message} />;
          })}
          <div ref={messagesSectionRef} />
        </div>
        <ChatTextField onSend={handleOnSend} />
      </div>
    </div>
  );
}
