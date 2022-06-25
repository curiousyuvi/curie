import { useEffect, useRef, useState } from "react";
import ChatTextField from "./ChatTextField";
import { Message } from "../interfaces/Message";
import ChatCloud from "./ChatCloud";
import { useParams } from "react-router-dom";
import { Room } from "../interfaces/Room";
import useRoom from "../hooks/useRoom";

export default function ChatRoom() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const handleOnSend = (value: string) => {
    setMessages([...messages, { type: "text", content: value, sender: "" }]);
  };
  const [room, setRoom] = useState<Room | null>(null);
  const params = useParams();
  const { getRoom } = useRoom();

  const scrollToBottom = () => {
    messagesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (params.rid)
      getRoom(params.rid).then((data) => {
        setRoom(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    room?.messages && setMessages(room.messages);
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 border-b border-indigo-300/30 bg-blue-900/90 px-2 py-1 flex items-center">
        <img
          alt="room"
          src={room?.image_url}
          className="h-10 rounded-full mr-2"
        />
        <h2 className="hover:underline">{room?.name}</h2>
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
