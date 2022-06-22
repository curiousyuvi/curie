import useAuth from "../hooks/useAuth";

export default function UserProfile() {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div className="w-full h-full flex flex-col rounded-br-lg bg-blue-900/70 p-8 items-center justify-center">
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
  );
}
