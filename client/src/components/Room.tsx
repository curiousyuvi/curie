import { useEffect, useRef, useState } from "react";
import ChatTextField from "./chatTextField";
import { Message } from "../models/Message";
import ChatCloud from "./chatCloud";

export default function Room() {
  const messagesSectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const handleOnSend = (value: String) => {
    setMessages([
      ...messages,
      { text: value, timestamp: Date.now(), senderUid: "" },
    ]);
  };

  const scrollToBottom = () => {
    messagesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messagesSectionRef.current);
    // messagesSectionRef.current?.scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
    console.log("called");
  }, [messages]);

  return (
    <div className="h-full bg-blue-900/70 w-full p-4 flex flex-col justify-between">
      <div
        className="w-full h-[calc(100vh-12.5rem)] flex flex-col overflow-x-hidden overflow-y-scroll mb-2"
        ref={messagesSectionRef}
      >
        {messages?.map((message) => {
          return <ChatCloud message={message} />;
        })}
      </div>
      <ChatTextField onSend={handleOnSend} />
    </div>
  );
}
