import { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { FaLess } from "react-icons/fa";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { RoomShort } from "../models/RoomShort";
import { useUserContext } from "../providers/UserProvider";

export default function Rooms() {
  const userContext = useUserContext();
  const user = userContext.currentUser;
  const location = useLocation();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full bg-indigo-700/50 w-72 flex flex-col border-r border-indigo-300/30">
        {user?.rooms.map((room) => {
          return <RoomsListTile room={room} />;
        })}
      </div>
      {location.pathname === "/chat/rooms" ? <NoRoomSelected /> : <Outlet />}
    </div>
  );
}

const RoomsListTile: FC<{ room: RoomShort }> = ({ room }) => {
  return (
    <Link to={`/chat/rooms/${room.rid}`}>
      <div className="w-full h-16 flex items-center justify-start p-2 border border-x-0 border-t-0 border-indigo-300/30 text-gray-300 text-lg hover:bg-indigo-500/10">
        <img
          alt="room"
          src={room.image_url}
          className="h-10 rounded-full mr-2"
        />
        <h2 className="hover:underline">{room.name}</h2>
      </div>
    </Link>
  );
};

const NoRoomSelected = () => {
  return (
    <div className="h-full bg-blue-900/70 w-full p-4 flex justify-center items-center">
      <h1>Go to a room</h1>
    </div>
  );
};
