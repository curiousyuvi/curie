import { IoPencil } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import OutlineButton from "../components/OutlineButton";
import useAuth from "../hooks/useAuth";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit_profile");
  };

  return (
    <div className="h-full bg-blue-900/70 w-full flex flex-col">
      <div className="w-full sm:h-[calc(100vh-10rem)] h-[calc(100vh-12rem)] p-4 flex flex-col items-center overflow-y-auto relative">
        <div className="absolute w-full h-[60rem] sm:translate-y-[-45rem] translate-y-[-48rem] rounded-full bg-indigo-500/50 z-[-1]"></div>

        <span className="my-[2.8rem]" />
        <div className="relative w-full flex justify-center">
          <img
            src={user?.avatar_url}
            alt="Room"
            className="sm:h-60 h-40 rounded-full bg-[#25317A]"
          />
          <p className="absolute px-[0.4rem] py-1 rounded-full bg-gray-700/80 text-xl cursor-pointer border border-indigo-300/30 bottom-5 sm:left-[calc(50%+4rem)] left-[calc(50%+3rem)] group">
            <span>{user?.status.split(" ")[0]}</span>
            <span className="m-1 hidden group-hover:inline">
              {user?.status.split(" ")[1]}
            </span>
          </p>
        </div>
        <span className="my-2" />
        <h2 className="sm:text-4xl text-2xl text-white">{user?.name}</h2>
        <span className="my-1" />
        <h3 className="sm:text-xl text text-white/70">
          <span>@</span>
          {user?.username}
        </h3>
        <span className="my-3" />
        <span>
          <OutlineButton onClick={handleEditClick}>
            <span className="flex items-center justify-center">
              <IoPencil />
              <span className="mx-1" />
              Edit Profile
            </span>
          </OutlineButton>
        </span>
        <span className="my-3" />
        <span>
          <OutlineButton type="red" onClick={handleLogOut}>
            <span className="flex items-center justify-center">
              <TbLogout />
              <span className="mx-1" />
              Log out
            </span>
          </OutlineButton>
        </span>
      </div>
    </div>
  );
}
