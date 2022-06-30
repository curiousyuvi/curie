import { useLocation } from "react-router-dom";
import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import {
  IoArrowRedo,
  IoArrowRedoOutline,
  IoChatboxEllipses,
  IoChatboxEllipsesOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import NavbarLinkButton from "./NavbarLinkButton";

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
