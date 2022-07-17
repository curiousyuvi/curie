import { IoArrowBack, IoPencil } from "react-icons/io5";
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
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate("/edit_profile");
  };

  return (
    <div className="h-full bg-blue-900/70 w-full flex flex-col">
      <div className="w-full h-12 flex justify-between items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl">User Profile</h1>
        <span className="w-10" />
      </div>
      <div className="w-full h-[calc(100vh-10rem)] p-4 flex flex-col items-center overflow-y-auto relative">
        <div className="absolute w-full h-[60rem] translate-y-[-45rem] rounded-full bg-indigo-500/50 z-[-1]"></div>

        <span className="my-[2.8rem]" />
        <div className="relative w-full flex justify-center">
          <img
            src={user?.avatar_url}
            alt="Room"
            className="h-60 rounded-full bg-[#25317A]"
          />
          <p className="absolute px-[0.4rem] py-1 rounded-full bg-gray-700/80 text-xl cursor-pointer border border-indigo-300/30 bottom-5 left-[calc(50%+4rem)] group">
            <span>{user?.status.split(" ")[0]}</span>
            <span className="m-1 hidden group-hover:inline">
              {user?.status.split(" ")[1]}
            </span>
          </p>
        </div>
        <span className="my-2" />
        <h2 className="text-4xl text-white">{user?.name}</h2>
        <span className="my-1" />
        <h3 className="text-xl text-white/70">
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
