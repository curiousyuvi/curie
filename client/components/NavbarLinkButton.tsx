import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

const NavbarLinkButton: FC<{
  to: string;
  IdleIcon: ReactNode;
  ActiveIcon: ReactNode;
}> = ({ to, IdleIcon, ActiveIcon }) => {
  const router = useRouter();

  return (
    <Link href={`${to}`} className="w-full">
      <div className="w-full h-16 flex items-center justify-start group relative cursor-pointer">
        <div
          className={"p-[0.2rem] rounded-full rounded-l-none duration-300 absolute ".concat(
            router.pathname === to ||
              (to === "/" && !otherPaths.includes(router.pathname))
              ? "bg-indigo-500 h-16"
              : "group-hover:bg-indigo-500/50 group-hover:h-4"
          )}
        ></div>
        <div
          className={"peer w-full h-16 flex justify-center items-center p-4 duration-300 ".concat(
            router.pathname === to ||
              (to === "/" && !otherPaths.includes(router.pathname))
              ? "bg-gradient-to-r from-indigo-500/30 to-transparent text-white"
              : "text-white/40"
          )}
        >
          {router.pathname === to ||
          (to === "/" && !otherPaths.includes(router.pathname))
            ? ActiveIcon
            : IdleIcon}
        </div>
      </div>
    </Link>
  );
};

export default NavbarLinkButton;

const otherPaths = ["/user_profile", "/settings", "/join", "/create"];
