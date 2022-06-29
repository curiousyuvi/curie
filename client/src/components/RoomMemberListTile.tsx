import { useState } from "react";
import {
  IoEllipsisHorizontal,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import useRoom from "../hooks/useRoom";
import { UserShort } from "../interfaces/UserShort";
import RoomMemberOptions from "./RoomMemberOptions";

const RoomMemberListTile = ({ user }: { user: UserShort }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { room } = useRoom();
  const handleOptionsClick = () => {
    setOptionsOpen(true);
  };

  const handleOptionsDismiss = () => {
    setOptionsOpen(false);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-end">
      <div className="w-full p-2 flex justify-between items-center border border-x-0 border-t-0 border-indigo-300/30">
        <div className="flex items-center">
          <img
            src={user.avatar_url}
            alt="avatar"
            className="h-12 rounded-full"
          />
          <span className="mx-1" />
          <div className="flex flex-col justify-start">
            <div className="flex items-center">
              <p className="text-white">{user.name}</p>
              <span className="mx-1" />
              {room.admins.includes(user.uid) ? (
                <span className="px-1 py-[0.1rem] font-medium border border-green-600 text-green-600 rounded text-sm">
                  Admin
                </span>
              ) : (
                <></>
              )}
            </div>
            <p className="text-sm">{user.status}</p>
          </div>
        </div>
        <button
          onClick={handleOptionsClick}
          className="ml-auto text-2xl p-2 hover:bg-white/10 rounded-full group duration-100"
        >
          <IoEllipsisHorizontalOutline className="group-hover:hidden" />
          <IoEllipsisHorizontal className="hidden group-hover:flex text-white" />
        </button>
      </div>
      {optionsOpen ? (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full"
            onClick={handleOptionsDismiss}
          />
          <RoomMemberOptions user={user} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomMemberListTile;
