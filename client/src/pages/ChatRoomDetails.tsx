import { useEffect, useRef, useState } from "react";
import { Message } from "../interfaces/Message";
import { useNavigate, useParams } from "react-router-dom";
import { Room } from "../interfaces/Room";
import useRoom from "../hooks/useRoom";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import { IoArrowBack, IoPencil } from "react-icons/io5";
import OutlineButton from "../components/OutlineButton";

export default function ChatRoomDetails() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const generatePlaceholderAvatar = usePlaceholderAvatar();
  const placeholderAvatar = generatePlaceholderAvatar();
  const [messages, setMessages] = useState<Message[]>([]);
  const { joinRoom } = useUser();
  const { joinUser } = useRoom();
  const { loadUser } = useAuth();
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
  const navigate = useNavigate();

  useEffect(() => {
    room?.messages && setMessages(room.messages);
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBackClick = () => {
    navigate(`/${params.rid}`);
  };

  return (
    <div className="h-full bg-blue-900/70 w-full flex flex-col">
      <div className="w-full h-12 flex justify-between items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl">Room Details</h1>
        <span className="w-10" />
      </div>
      <div className="w-full h-[calc(100vh-10rem)] p-4 flex flex-col items-center overflow-y-auto relative">
        <div className="absolute w-full h-[40rem] translate-y-[-22rem] rounded-full bg-indigo-500/50 z-[-1]"></div>

        <span className="my-[4.5rem]" />
        <img
          src={room.image_url}
          alt="Room"
          className="h-60 rounded-full p-2 border-4 border-white bg-[#25317A]"
        />
        <span className="my-2" />
        <h2 className="text-4xl text-white">{room.name}</h2>
        <span className="my-3" />
        <span>
          <OutlineButton>
            <span className="flex items-center justify-center">
              <IoPencil />
              <span className="mx-1" />
              Edit Room
            </span>
          </OutlineButton>
        </span>
      </div>
    </div>
  );
}
