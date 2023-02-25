import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import ChatCloud from "../components/ChatCloud";
import ChatDateRule from "../components/ChatDateRule";
import ChatLoading from "../components/ChatLoading";
import ChatNotFound from "../components/ChatNotFound";
import ChatNotification from "../components/ChatNotification";
import ChatRoomHeader from "../components/ChatRoomHeader";
import Music from "../components/Music";
import NoRooms from "../components/NoRooms";
import RoomsList from "../components/RoomsList";
import RoomsListTile from "../components/RoomsListTile";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import useSocket from "../hooks/useSocket";
import { Message } from "../interfaces/Message";
import { getRoomAPI } from "../services/apiServices";
import { RootState } from "../store";
import { addMessage, addRoom } from "../store/roomsSlice";
import RoomMusicProvider from "../providers/roomMusicProvider";
import { useQuery } from "@tanstack/react-query";
import useGetRoom from "../hooks/useGetRoom";

const ChatTextField = dynamic(() => import("../components/ChatTextField"), {
  ssr: false,
});

const ChatRoomPage = () => {
  const messagesSectionRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
    {
      mid: "63f8a2cb0000000000000000",
      type: "text",
      content: "hi",
      senderName: "Paul",
      senderAvatar:
        "https://avatars.dicebear.com/api/miniavs/vtRAntRZGQ3VciUQ.svg?b=%23bc90aa",
      senderUid: "8b4605dd-6bc9-4ac1-baa1-2f6e179817cf",
    },
  ]);

  //   const { rooms } = useSelector((state: RootState) => state.rooms);

  //   const dispatch = useDispatch();

  const [messageList, setMessageList] = useState<any>([]);
  const { dateFromMid, formatDate, midFromDate } = useDateTimeHelper();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleOnSend = (value: string) => {
    setMessages([
      ...messages,
      {
        mid: midFromDate(new Date()),
        type: "text",
        content: value,
        senderName: currentUser?.name,
        senderAvatar: currentUser?.avatarUrl,
        senderUid: currentUser?.uid,
      },
    ]);

    // dispatch(
    //   addMessage({
    //     rid: "",
    //     message: {
    //       mid: midFromDate(new Date()),
    //       type: "text",
    //       content: value,
    //       senderName: currentUser?.name,
    //       senderAvatar: currentUser?.avatarUrl,
    //       senderUid: currentUser?.uid,
    //     },
    //   })
    // );

    // if (socket)
    //   socket.emit("send_message", {
    //     message: {
    //       mid: midFromDate(new Date()),
    //       type: "text",
    //       content: value,
    //       senderUid: currentUser?.uid,
    //       senderName: currentUser?.name,
    //       senderAvatar: currentUser?.avatarUrl,
    //     },
    //     rid: router.query?.rid,
    //   });
  };

  //   const getMessages = () => {
  //     const exists = rooms.find((room) => room.rid === router.query?.rid);
  //     if (exists) {
  //       const foundIdx = rooms.findIndex((room) => room.rid == router.query?.rid);
  //       setMessages(rooms[foundIdx].messages);
  //     }
  //   };

  const scrollToBottom = () => {
    // messagesSectionRef.current?.scrollIntoView({ behavior: "auto" });
    const element = messagesSectionRef.current;
    element?.scrollTo(0, element?.scrollHeight);
  };

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
        newMessageList.push(
          <ChatNotification key={message.mid} message={message} />
        );
      // TODO: Write code for MusicCloud
      // else if (message.type === "music")
      //   newMessageList.push(
      //     <ChatMusicCloud key={message.mid} message={message} />
      //   );
    });

    setMessageList(newMessageList);
  };

  //   const handleReceiveMessageSocket = ({
  //     message,
  //     rid,
  //   }: {
  //     message: Message;
  //     rid: string;
  //   }) => {
  //     dispatch(addMessage({ rid, message }));
  //     if (rid === router.query?.rid) {
  //       setMessages([...messages, message]);
  //     }
  //   };
  //   const { socket } = useSocket();

  //   useEffect(() => {
  //     if (socket) socket.on("receive_message", handleReceiveMessageSocket);
  //     return () => {
  //       socket?.off("receive_message", handleReceiveMessageSocket);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [socket, messages]);

  //   useEffect(() => {
  //     if (socket && currentUser) {
  //       socket.emit("send_join_room", {
  //         user: currentUser,
  //         rid: router.query?.rid,
  //       });
  //     }
  //   }, [router.query?.rid]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    createMessageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  //   useEffect(() => {
  //     getMessages();
  //   }, [router.query?.rid]);

  //   useEffect(() => {
  //     if (getRoomQuery.isSuccess) {
  //       dispatch(addRoom(getRoomQuery.data.data));
  //     }
  //   }, [getRoomQuery.isSuccess]);

  const router = useRouter();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Head>
        <title>Test Room | Curie</title>
      </Head>
      <div className="h-full hidden md:flex">
        <RoomsList />
      </div>

      {false ? (
        <ChatNotFound />
      ) : false ? (
        <ChatLoading />
      ) : (
        <div
          className={"h-full w-full ".concat(
            router.pathname === "/" ? "hidden sm:flex" : ""
          )}
        >
          <div className="w-full h-full flex flex-col">
            <ChatRoomHeader
              room={{ rid: "", name: "Test Room", image_url: "" }}
            />
            <div className="h-full bg-blue-900/70 w-full p-2 pr-1 pb-16 sm:p-4 flex flex-col justify-start relative z-10">
              <div
                ref={messagesSectionRef}
                className="w-full sm:h-[calc(100vh-17.5rem)] h-[calc(100vh-17rem)]  flex flex-col overflow-x-hidden overflow-y-scroll mb-2 relative z-10"
              >
                {messageList}
                {/* TODO: Chat Voting Cloud comes here */}
                {/* <ChatVotingCloud /> */}
              </div>
              <ChatTextField onSend={handleOnSend} />
              {/* TODO: Music Player FAB comes here */}
              <RoomMusicProvider>
                <Music />
              </RoomMusicProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
