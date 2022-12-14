import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import NoRooms from "../components/NoRooms";
import RoomsList from "../components/RoomsList";
import RoomsListTile from "../components/RoomsListTile";
const ChatTextField = dynamic(() => import("../components/ChatTextField"), {
  ssr: false,
});

const ChatRoomPage = () => {
  const handleBackClick = () => {};
  const handleOptionsClick = () => {};
  const handleOnSend = () => {};

  const messagesSectionRef = useRef(null);

  const rooms: any = [];
  const router = useRouter();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Head>
        <title>Room Name | Curie</title>
      </Head>
      <RoomsList />
      <div
        className={"h-full w-full ".concat(
          router.pathname === "/" ? "hidden sm:flex" : ""
        )}
      >
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-16 border-b border-indigo-300/30 bg-blue-900/90 px-2 py-1 flex items-center">
            <button
              className="text-2xl hover:text-white duration-100 sm:hidden"
              onClick={handleBackClick}
            >
              <IoArrowBack />
            </button>
            {/* TODO: room name comes here */}
            {/* <img
          alt="room"
          src={room?.image_url}
          className="h-10 rounded-full mx-2"
        /> */}
            <img
              alt="room"
              src="/assets/room.png"
              className="h-10 rounded-full mx-2 aspect-square object-cover"
            />
            {/* TODO: room name comes here */}
            {/* <h2>{room?.name}</h2> */}
            <h2>Room Name</h2>
            <button
              onClick={handleOptionsClick}
              className="ml-auto text-2xl p-2 hover:bg-white/10 rounded-full group duration-100"
            >
              <IoEllipsisVerticalOutline className="group-hover:hidden" />
              <IoEllipsisVertical className="hidden group-hover:flex text-white" />
            </button>
          </div>
          <div className="h-full bg-blue-900/70 w-full p-2 pr-1 sm:p-4 flex flex-col justify-start relative z-10">
            <div className="w-full sm:h-[calc(100vh-17.5rem)] h-[calc(100vh-17rem)]  flex flex-col overflow-x-hidden overflow-y-scroll mb-2 relative z-10">
              {/* TODO: Message list comes here */}
              {/* {messageList} */}
              {/* TODO: Chat Voting Cloud comes here */}
              {/* <ChatVotingCloud /> */}
              <div ref={messagesSectionRef} />
            </div>
            <ChatTextField onSend={handleOnSend} />
            {/* TODO: Music Player FAB comes here */}
            {/* <Music
          musicModalOpen={musicModalOpen}
          setMusicModalOpen={setMusicModalOpen}
        /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
