import { NavLink, useLocation } from "react-router-dom";
import {
  BsFillChatDotsFill,
  BsFillGearFill,
  BsFillPlusSquareFill,
  BsPlusSquare,
} from "react-icons/bs";
import {
  IoArrowRedo,
  IoArrowRedoOutline,
  IoArrowRedoSharp,
  IoChatboxEllipses,
  IoChatboxEllipsesOutline,
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="w-16 h-full rounded-bl-lg backdrop-blur-md bg-indigo-700/50 border border-l-0 border-y-0 border-indigo-300/30 text-gray-800/50 text-4xl flex flex-col items-center justify-even/50 px-0">
      <NavbarLinkButton
        to="/"
        IdleIcon={<IoChatboxEllipsesOutline />}
        ActiveIcon={<IoChatboxEllipses />}
      />
      <NavbarLinkButton
        to="/user_profile"
        IdleIcon={<Avatar />}
        ActiveIcon={<Avatar active />}
      />
      <NavbarLinkButton
        to="/settings"
        IdleIcon={<IoSettingsOutline />}
        ActiveIcon={<IoSettings />}
      />
      <NavbarLinkButton
        to="/join_room"
        IdleIcon={<IoArrowRedoOutline />}
        ActiveIcon={<IoArrowRedo />}
      />
      <NavbarLinkButton
        to="/create_room"
        IdleIcon={<BsPlusSquare />}
        ActiveIcon={<BsFillPlusSquareFill />}
      />
    </div>
  );
}

const NavbarLinkButton: FC<{
  to: string;
  IdleIcon: ReactNode;
  ActiveIcon: ReactNode;
}> = ({ to, IdleIcon, ActiveIcon }) => {
  const location = useLocation();
  return (
    <NavLink to={`${to}`} className="w-full">
      <div className="w-full h-16 flex items-center justify-start group relative">
        <div
          className={"p-[0.2rem] rounded-full rounded-l-none duration-300 absolute ".concat(
            location.pathname === to
              ? "bg-indigo-500 h-16"
              : "group-hover:bg-indigo-500/50 group-hover:h-4"
          )}
        ></div>
        <div
          className={"peer w-full h-16 flex justify-center items-center p-4 duration-300 ".concat(
            location.pathname === to
              ? "bg-gradient-to-r from-indigo-500/30 to-transparent text-white"
              : "text-white/40"
          )}
        >
          {location.pathname === to ? ActiveIcon : IdleIcon}
        </div>
      </div>
    </NavLink>
  );
};

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
