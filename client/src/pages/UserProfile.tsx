import { FaUserCircle } from "react-icons/fa";

export default function UserProfile() {
  const user = {
    name: "Yuvraj Singh",
    username: "curiousyuvi",
    status: "🔥Enjoying rap songs!!!",
  };
  return (
    <div className="w-full h-full flex rounded-br-lg bg-blue-900/70 p-8">
      <FaUserCircle className="text-9xl mr-8" />
      <div className="flex flex-col items-start">
        <label className="text-3xl mb-2 text-gray-200">{user.name}</label>
        <label className="text-md bg-indigo-500 px-2 mb-2 rounded-lg text-white">
          {"@" + user.username}
        </label>
        <label>{user.status}</label>
      </div>
    </div>
  );
}
