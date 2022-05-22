import { Link, useLocation } from "react-router-dom";
import {
  BsFillChatDotsFill,
  BsFillGearFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FC, ReactNode } from "react";

export default function Navbar() {
  return (
    <div className="w-16 h-full rounded-bl-lg backdrop-blur-md bg-indigo-700/50 border border-l-0 border-y-0 border-indigo-300/30 text-gray-800/50 text-4xl flex flex-col items-center justify-even/50 px-0">
      <NavbarLinkButton to="/">
        <BsFillChatDotsFill />
      </NavbarLinkButton>
      <NavbarLinkButton to="/user-profile">
        <FaUserCircle />
      </NavbarLinkButton>
      <NavbarLinkButton to="/settings">
        <BsFillGearFill />
      </NavbarLinkButton>
      <NavbarLinkButton to="/create-room" isAdd>
        <BsFillPlusSquareFill />
      </NavbarLinkButton>
    </div>
  );
}

const NavbarLinkButton: FC<{
  to: String;
  isAdd?: Boolean;
  children: ReactNode;
}> = ({ to, children, isAdd }) => {
  const location = useLocation();
  return (
    <Link to={`${to}`} className="w-full">
      <div
        className={"w-full h-16 flex justify-center items-center p-2 hover:bg-gray-300/10 hover:text-gray-100/50 duration-300 "
          .concat(
            location.pathname === to
              ? "bg-indigo-500/60 text-gray-200 hover:bg-indigo-500 hover:text-gray-200 "
              : ""
          )
          .concat(
            isAdd
              ? "text-indigo-400/80 hover:text-gray-200 bg-transparent hover:bg-indigo-500"
              : ""
          )}
      >
        {children}
      </div>
    </Link>
  );
};
