import React from "react";
import { IoChatboxEllipsesOutline, IoChatboxEllipses } from "react-icons/io5";
import {
  RiLoginBoxLine,
  RiLoginBoxFill,
  RiAddBoxLine,
  RiAddBoxFill,
} from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import NavbarLinkButton from "./NavbarLinkButton";

const DesktopNavbar = () => {
  return (
    <div
      className={"hidden sm:flex w-16 h-full rounded-bl-lg backdrop-blur-md bg-indigo-700/50 border border-l-0 border-y-0 border-indigo-300/30 text-gray-800/50 text-4xl flex-col items-center justify-even/50 px-0".concat()}
    >
      <NavbarLinkButton
        to="/"
        IdleIcon={<IoChatboxEllipsesOutline />}
        ActiveIcon={<IoChatboxEllipses />}
      />
      <NavbarLinkButton
        to="/join_room"
        IdleIcon={<RiLoginBoxLine />}
        ActiveIcon={<RiLoginBoxFill />}
      />
      <NavbarLinkButton
        to="/create_room"
        IdleIcon={<RiAddBoxLine />}
        ActiveIcon={<RiAddBoxFill />}
      />
      <NavbarLinkButton
        to="/user_profile"
        IdleIcon={<Avatar />}
        ActiveIcon={<Avatar active />}
      />
    </div>
  );
};

export default DesktopNavbar;

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
