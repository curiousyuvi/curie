import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

const MobileNavbarLinkButton: FC<{
  to: string;
  IdleIcon: ReactNode;
  ActiveIcon: ReactNode;
}> = ({ to, IdleIcon, ActiveIcon }) => {
  const router = useRouter();

  return (
    <Link href={`${to}`} className="w-full">
      <div className="w-full h-full flex items-end justify-center group relative cursor-pointer">
        <div
          className={"peer w-16 h-full flex justify-center items-center p-4 duration-300 ".concat(
            router.pathname === to ||
              (to === "/" && !otherPaths.includes(router.pathname))
              ? "text-white"
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

export default MobileNavbarLinkButton;

const otherPaths = ["/user_profile", "/settings", "/join", "/create"];
