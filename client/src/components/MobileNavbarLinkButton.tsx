import { FC, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

const MobileNavbarLinkButton: FC<{
  to: string;
  IdleIcon: ReactNode;
  ActiveIcon: ReactNode;
}> = ({ to, IdleIcon, ActiveIcon }) => {
  const location = useLocation();
  return (
    <NavLink to={`${to}`} className="w-full">
      <div className="w-full h-full flex items-end justify-center group relative">
        <div
          className={"peer w-16 h-full flex justify-center items-center p-4 duration-300 ".concat(
            location.pathname === to ||
              (to === "/" && !otherPaths.includes(location.pathname))
              ? "text-white"
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

export default MobileNavbarLinkButton;

const otherPaths = ["/user_profile", "/settings", "/join_room", "/create_room"];
