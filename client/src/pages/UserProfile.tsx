import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../providers/UserProvider";

export default function UserProfile() {
  const userContext = useUserContext();
  const user = userContext;
  return (
    <div className="w-full h-full flex flex-col rounded-br-lg bg-blue-900/70 p-8 items-center justify-center">
      <img
        alt="avatar"
        src={user!.avatar_url}
        className="h-60 mb-4 rounded-full border-4 p-2 border-indigo-500"
      />
      <div className="flex flex-col items-center">
        <label className="text-4xl mb-2 text-gray-200 font-medium">
          {user!.name}
        </label>
        <label className="mb-2">{"@" + user!.username}</label>
        <label>{user!.status}</label>
      </div>
    </div>
  );
}
