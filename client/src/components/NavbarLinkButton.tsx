import { FC, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
            location.pathname === to ||
              (to === "/" && !otherPaths.includes(location.pathname))
              ? "bg-indigo-500 h-16"
              : "group-hover:bg-indigo-500/50 group-hover:h-4"
          )}
        ></div>
        <div
          className={"peer w-full h-16 flex justify-center items-center p-4 duration-300 ".concat(
            location.pathname === to ||
              (to === "/" && !otherPaths.includes(location.pathname))
              ? "bg-gradient-to-r from-indigo-500/30 to-transparent text-white"
              : "text-white/40"
          )}
        >
          {location.pathname === to ||
          (to === "/" && !otherPaths.includes(location.pathname))
            ? ActiveIcon
            : IdleIcon}
        </div>
      </div>
    </NavLink>
  );
};

export default NavbarLinkButton;

const otherPaths = ["/user_profile", "/settings", "/join_room", "/create_room"];
