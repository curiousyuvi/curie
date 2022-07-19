import React from "react";
import { IoChatboxEllipsesOutline, IoChatboxEllipses } from "react-icons/io5";
import {
  RiLoginBoxLine,
  RiLoginBoxFill,
  RiAddBoxLine,
  RiAddBoxFill,
} from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import MobileNavbarLinkButton from "./MobileNavbarLinkButton";

const MobileNavbar = () => {
  return (
    <div className="sm:hidden flex w-full h-16 backdrop-blur-md bg-indigo-700/50 border border-x-0 border-b-0 border-indigo-300/30 text-gray-800/50 text-4xl items-center justify-evenly px-1">
      <MobileNavbarLinkButton
        to="/"
        IdleIcon={<IoChatboxEllipsesOutline />}
        ActiveIcon={<IoChatboxEllipses />}
      />
      <MobileNavbarLinkButton
        to="/join_room"
        IdleIcon={<RiLoginBoxLine />}
        ActiveIcon={<RiLoginBoxFill />}
      />
      <MobileNavbarLinkButton
        to="/create_room"
        IdleIcon={<RiAddBoxLine />}
        ActiveIcon={<RiAddBoxFill />}
      />
      <MobileNavbarLinkButton
        to="/user_profile"
        IdleIcon={<Avatar />}
        ActiveIcon={<Avatar active />}
      />
    </div>
  );
};

export default MobileNavbar;

const Avatar = ({ active }: { active?: boolean }) => {
  const { user } = useAuth();
  return (
    <img
      src={user?.avatar_url}
      alt="avatar"
      className={"rounded-full border-2 ".concat(
        active ? "border-white" : "border-transparent opacity-70"
      )}
    />
  );
};
