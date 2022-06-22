import { NavLink, useLocation } from "react-router-dom";
import {
  BsFillChatDotsFill,
  BsFillGearFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import { IoArrowRedoSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FC, ReactNode } from "react";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="w-16 h-full rounded-bl-lg backdrop-blur-md bg-indigo-700/50 border border-l-0 border-y-0 border-indigo-300/30 text-gray-800/50 text-4xl flex flex-col items-center justify-even/50 px-0">
      <NavbarLinkButton to="/">
        <BsFillChatDotsFill />
      </NavbarLinkButton>
      <NavbarLinkButton to="/user_profile">
        <FaUserCircle />
      </NavbarLinkButton>
      <NavbarLinkButton to="/settings">
        <BsFillGearFill />
      </NavbarLinkButton>
      <NavLink to="/join_room" className="w-full">
        <div
          className={"w-full h-16 flex justify-center items-center p-2 hover:bg-orange-500 hover:text-gray-200 duration-300  ".concat(
            location.pathname === "/join-room"
              ? "bg-orange-500/70 text-gray-200"
              : "text-orange-500/70"
          )}
        >
          <IoArrowRedoSharp />
        </div>
      </NavLink>
      <NavLink to="/create_room" className="w-full">
        <div
          className={"w-full h-16 flex justify-center items-center p-2 hover:bg-green-500 hover:text-gray-200 duration-300  ".concat(
            location.pathname === "/create-room"
              ? "bg-green-500/70 text-gray-100"
              : "text-green-500/70"
          )}
        >
          <BsFillPlusSquareFill />
        </div>
      </NavLink>
    </div>
  );
}

const NavbarLinkButton: FC<{
  to: string;
  children: ReactNode;
}> = ({ to, children }) => {
  const location = useLocation();
  return (
    <NavLink to={`${to}`} className="w-full">
      <div
        className={"w-full h-16 flex justify-center items-center p-2 duration-300 ".concat(
          location.pathname.startsWith(to)
            ? "bg-indigo-500/60 text-gray-200 hover:bg-indigo-500 hover:text-gray-200 "
            : "hover:bg-gray-300/10 hover:text-gray-100/80"
        )}
      >
        {children}
      </div>
    </NavLink>
  );
};
