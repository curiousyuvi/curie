import React, { useState } from "react";
import {
  IoArrowBack,
  IoEllipsisVerticalOutline,
  IoEllipsisVertical,
  IoExitOutline,
} from "react-icons/io5";
import { RoomShort } from "../interfaces/RoomShort";
import Tooltip from "react-power-tooltip";
import { AiOutlineCopy } from "react-icons/ai";
import useToast from "../hooks/useToast";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeRoom } from "../store/roomsSlice";

const ChatRoomHeader = ({ room }: { room: RoomShort }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { successToast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    router.replace("/");
  };
  const handleCopyRid = () => {
    navigator.clipboard.writeText(room.rid);
    successToast("Room ID copied to clipboard!");
  };
  const handleLeaveRoom = () => {
    router.replace("/");
    dispatch(removeRoom(room.rid));
  };
  const handleOptionsOpen = () => {
    setShowOptions(true);
  };

  const handleOptionsClose = () => {
    setShowOptions(false);
  };

  return (
    <div className="w-full h-16 border-b border-indigo-300/30 bg-blue-900/90 px-2 py-1 flex items-center">
      <button
        className="text-2xl hover:text-white duration-100 sm:hidden"
        onClick={handleBackClick}
      >
        <IoArrowBack />
      </button>
      <img
        alt="room"
        src={room.image_url}
        className="h-10 rounded-full mx-2 aspect-square object-cover"
      />
      <h2>{room.name}</h2>
      <button
        onMouseOver={handleOptionsOpen}
        onMouseLeave={handleOptionsClose}
        className="relative ml-auto text-2xl p-2 hover:bg-white/10 rounded-full group duration-100"
      >
        <IoEllipsisVerticalOutline className="group-hover:hidden" />
        <IoEllipsisVertical className="hidden group-hover:flex text-white" />
        <Tooltip
          show={showOptions}
          position="left center"
          color="white"
          backgroundColor="rgba(79, 70, 229,0.5)"
          lineSeparated="1px solid rgba(1,1,1,0.3)"
          flat
        >
          <li
            onClick={handleCopyRid}
            className="text-base -translate-x-3 w-60 font-normal border-1 flex gap-2 items-center bg-red-600"
          >
            <AiOutlineCopy className="text-xl" /> Copy Room ID
          </li>
          <li
            onClick={handleLeaveRoom}
            className="text-base -translate-x-3 w-60 font-normal border-1 flex gap-2 items-center bg-red-600"
          >
            <IoExitOutline className="text-xl" /> Leave Room
          </li>
        </Tooltip>
      </button>
    </div>
  );
};

export default ChatRoomHeader;
