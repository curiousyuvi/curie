import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import NoRoom from "../components/NoRoom";
import NoRooms from "../components/NoRooms";
import RoomsList from "../components/RoomsList";
import RoomsListTile from "../components/RoomsListTile";
const ChatTextField = dynamic(() => import("../components/ChatTextField"), {
  ssr: false,
});

const RoomsPage = () => {
  const handleBackClick = () => {};
  const handleOptionsClick = () => {};
  const handleOnSend = () => {};

  const messagesSectionRef = useRef(null);

  const rooms: any = [];
  const router = useRouter();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Head>
        <title>Curie | Chat</title>
        <meta name="description" content="A chat app for music lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomsList />
      <div className="w-full h-full hidden md:flex">
        <NoRoom />
      </div>
    </div>
  );
};

export default RoomsPage;
