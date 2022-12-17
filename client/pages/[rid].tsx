import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import Lottie from "react-lottie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import ChatLoading from "../components/ChatLoading";
import ChatNotFound from "../components/ChatNotFound";
import ChatRoomHeader from "../components/ChatRoomHeader";
import NoRooms from "../components/NoRooms";
import RoomsList from "../components/RoomsList";
import RoomsListTile from "../components/RoomsListTile";
import { getRoomAPI } from "../services/apiServices";
import { RootState } from "../store";
import { addRoom } from "../store/roomsSlice";

const ChatTextField = dynamic(() => import("../components/ChatTextField"), {
  ssr: false,
});

const ChatRoomPage = () => {
  const handleOnSend = () => {};

  const messagesSectionRef = useRef(null);

  const { rooms } = useSelector((state: RootState) => state.rooms);

  const router = useRouter();

  const query = useQuery([router.asPath, router.asPath], getRoomAPI);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(addRoom(query.data.data));
    }
  }, [query.isSuccess]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Head>
        <title>{query.data?.data.name} | Curie</title>
      </Head>
      <div className="h-full hidden md:flex">
        <RoomsList />
      </div>

      {query.error ? (
        <ChatNotFound />
      ) : query.isLoading ? (
        <ChatLoading />
      ) : (
        <div
          className={"h-full w-full ".concat(
            router.pathname === "/" ? "hidden sm:flex" : ""
          )}
        >
          <div className="w-full h-full flex flex-col">
            <ChatRoomHeader room={query.data?.data} />
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
      )}
    </div>
  );
};

export default ChatRoomPage;
