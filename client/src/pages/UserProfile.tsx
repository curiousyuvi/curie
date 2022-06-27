import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UserProfile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-full flex flex-col rounded-br-lg bg-blue-900/70 items-center">
      <div className="w-full h-12 sm:h-24 flex items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2 sm:hidden"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl mx-auto sm:text-4xl">
          User Profile
        </h1>
        <span className="w-10 sm:hidden" />
      </div>
      <div className="w-full flex flex-col p-8 items-center">
        <img
          alt="avatar"
          src={user?.avatar_url}
          className="h-60 mb-4 rounded-full border-4 p-2 border-indigo-500"
        />
        <div className="flex flex-col items-center mb-2">
          <label className="text-4xl mb-2 text-gray-200 font-medium">
            {user?.name}
          </label>
          <label className="mb-2">{"@" + user?.username}</label>
          <label>{user?.status}</label>
        </div>
        <button
          onClick={auth.logout}
          className="p-2 rounded-lg border border-2 border-red-500/70 text-red-500/70 hover:text-red-500 hover:border-red-500 font-semibold duration-100 text-lg"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
