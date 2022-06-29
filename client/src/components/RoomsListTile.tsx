import { FC } from "react";
import { Link } from "react-router-dom";
import { RoomShort } from "../interfaces/RoomShort";

const RoomsListTile: FC<{ room: RoomShort }> = ({ room }) => {
  return (
    <Link to={`/${room.rid}`}>
      <div className="h-16 w-full lg:w-60 flex items-center justify-start p-2 border border-x-0 border-t-0 border-indigo-300/30 md:border-b-0 lg:border-b text-gray-300 text-lg hover:bg-indigo-500/10">
        <img
          alt="room"
          src={room.image_url}
          className="h-10 rounded-full mr-2"
        />
        <h2 className="hover:underline sm:hidden lg:flex">{room.name}</h2>
      </div>
    </Link>
  );
};

export default RoomsListTile;
