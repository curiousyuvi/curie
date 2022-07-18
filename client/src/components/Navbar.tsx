import { useLocation } from "react-router-dom";
import { IoChatboxEllipses, IoChatboxEllipsesOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import NavbarLinkButton from "./NavbarLinkButton";
import {
  RiAddBoxFill,
  RiAddBoxLine,
  RiLoginBoxFill,
  RiLoginBoxLine,
} from "react-icons/ri";

export default function Navbar() {
  const location = useLocation();
  return (
    <div
      className={"w-16 h-full rounded-bl-lg backdrop-blur-md bg-indigo-700/50 border border-l-0 border-y-0 border-indigo-300/30 text-gray-800/50 text-4xl flex-col items-center justify-even/50 px-0 ".concat(
        location.pathname === "/" ? "flex" : "hidden sm:flex"
      )}
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
}

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
