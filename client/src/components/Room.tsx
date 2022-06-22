import { useEffect, useRef, useState } from "react";
import ChatTextField from "./ChatTextField";
import { Message } from "../interfaces/Message";
import ChatCloud from "./ChatCloud";
import { useRoomContext } from "../providers/RoomProvider";
import { useParams } from "react-router-dom";

export default function Room() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const roomContext = useRoomContext();
  const handleOnSend = (value: string) => {
    setMessages([
      ...messages,
      { type: "text", text: value, timestamp: Date.now(), senderUid: "" },
    ]);
  };
  const room = roomContext.currentRoom;
  const params = useParams();

  const scrollToBottom = () => {
    messagesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    roomContext.switchRoom(params.rid || "");
  }, []);

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
