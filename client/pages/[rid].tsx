import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCloud from "../components/ChatCloud";
import ChatDateRule from "../components/ChatDateRule";
import ChatLoading from "../components/ChatLoading";
import ChatNotFound from "../components/ChatNotFound";
import ChatNotification from "../components/ChatNotification";
import ChatRoomHeader from "../components/ChatRoomHeader";
import Music from "../components/Music";
import RoomsList from "../components/RoomsList";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import useSocket from "../hooks/useSocket";
import { Message } from "../interfaces/Message";
import { RootState } from "../store";
import { addMessage, addMessages, addRoom } from "../store/roomsSlice";
import useGetRoom from "../hooks/useGetRoom";
import ChatVotingCloud from "../components/ChatVotingCloud";
import ChatMusicCloud from "../components/ChatMusicCloud";
import useRoomMusic from "../hooks/useRoomMusic";
import usePostMessage from "../hooks/usePostMessage";
import { getMessagesAPI } from "../services/apiServices";
import { getUnixEpochTime } from "../helpers/epoch";

const ChatTextField = dynamic(() => import("../components/ChatTextField"), {
  ssr: false,
});

const ChatRoomPage = () => {
  const messagesSectionRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatsHeight, setChatsHeight] = useState(0);

  const { rooms } = useSelector((state: RootState) => state.rooms);

  const router = useRouter();

  const getRoomQuery = useGetRoom(router.query?.rid);

  const dispatch = useDispatch();

  const [messageList, setMessageList] = useState<any>([]);
  const { dateFromMid, formatDate, midFromDate } = useDateTimeHelper();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const postMessageMutation = usePostMessage();

  const handleOnSend = (value: string) => {
    // setMessages([
    //   ...messages,
    //   {
    //     rid: router?.query?.rid as string,
    //     mid: midFromDate(new Date()),
    //     type: "text",
    //     content: value,
    //     senderName: currentUser?.name,
    //     senderAvatar: currentUser?.avatarUrl,
    //     senderUid: currentUser?.uid,
    //   },
    // ]);

    dispatch(
      addMessage({
        rid: router.query?.rid as string,
        message: {
          rid: router?.query?.rid as string,
          mid: midFromDate(new Date()),
          type: "text",
          content: value,
          senderName: currentUser?.name,
          senderAvatar: currentUser?.avatarUrl,
          senderUid: currentUser?.uid,
        },
      })
    );

    if (socket)
      socket.emit("send_message", {
        message: {
          rid: router.query?.rid as string,
          mid: midFromDate(new Date()),
          type: "text",
          content: value,
          senderUid: currentUser?.uid,
          senderName: currentUser?.name,
          senderAvatar: currentUser?.avatarUrl,
        },
        rid: router.query?.rid,
      });

    postMessageMutation.mutate({
      rid: router.query?.rid as string,
      type: "text",
      content: value,
      senderUid: currentUser?.uid,
      senderName: currentUser?.name,
      senderAvatar: currentUser?.avatarUrl,
    });
  };

  const getMessages = () => {
    const exists = rooms.find((room) => room.rid === router.query?.rid);
    if (exists) {
      const foundIdx = rooms.findIndex((room) => room.rid == router.query?.rid);
      setMessages(rooms[foundIdx].messages);
    }
  };

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
      else if (message.type === "music")
        newMessageList.push(
          <ChatMusicCloud key={message.mid} message={message} />
        );
    });

    setMessageList(newMessageList);
  };

  const handleReceiveMessageSocket = ({
    message,
    rid,
  }: {
    message: Message;
    rid: string;
  }) => {
    dispatch(addMessage({ rid, message }));
    if (rid === router.query?.rid) {
      setMessages([...messages, message]);
    }
  };
  const { socket } = useSocket();
  const { voting, setVoting } = useRoomMusic();

  useEffect(() => {
    if (socket) socket.on("receive_message", handleReceiveMessageSocket);
    return () => {
      socket?.off("receive_message", handleReceiveMessageSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages]);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit("send_join_room", {
        user: currentUser,
        rid: router.query?.rid,
      });
    }

    return () => {
      socket?.emit("send_leave_room", {
        user: currentUser,
        rid: router.query?.rid,
      });
    };
  }, [router.query?.rid]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList, voting]);

  useEffect(() => {
    createMessageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, [router.query?.rid, rooms]);

  useEffect(() => {
    if (getRoomQuery.isSuccess) {
      dispatch(addRoom(getRoomQuery.data.data));
    }
  }, [getRoomQuery.isSuccess]);

  useEffect(() => {
    function handleResize() {
      setChatsHeight(window.innerHeight - 273);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const loadMessagesFromDB = async () => {
      try {
        const exists = rooms.find((room) => room.rid === router.query?.rid);
        if (exists) {
          const foundIdx = rooms.findIndex(
            (room) => room.rid == router.query?.rid
          );
          const res = await getMessagesAPI(
            router?.query?.rid,
            rooms[foundIdx].messages.length > 0
              ? getUnixEpochTime(
                  dateFromMid(
                    rooms[foundIdx].messages[
                      rooms[foundIdx].messages.length - 1
                    ].mid
                  )
                )
              : undefined
          );
          dispatch(
            addMessages({
              rid: router?.query?.rid as string,
              messages: res?.data,
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadMessagesFromDB();
  }, [router?.query?.rid]);

  useEffect(() => {
    setVoting(false);
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Head>
        <title>{getRoomQuery.data?.data.name} | Curie</title>
      </Head>
      <div className="h-full hidden md:flex">
        <RoomsList />
      </div>

      {getRoomQuery.error ? (
        <ChatNotFound />
      ) : getRoomQuery.isLoading ? (
        <ChatLoading />
      ) : (
        <div
          className={"h-full w-full ".concat(
            router.pathname === "/" ? "hidden sm:flex" : ""
          )}
        >
          <div className="w-full h-full flex flex-col">
            <ChatRoomHeader room={getRoomQuery.data?.data} />
            <div className="h-full bg-blue-900/70 w-full pt-2 px-0 pb-2 sm:py-4 flex flex-col justify-start relative z-10">
              <div
                ref={messagesSectionRef}
                style={{ height: `${chatsHeight}px` }}
                className="w-full px-3 flex flex-col overflow-x-hidden overflow-y-scroll mb-2 relative z-10"
              >
                {messageList}
                <ChatVotingCloud />
              </div>
              <ChatTextField onSend={handleOnSend} />
              <Music />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
