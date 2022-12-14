import Link from "next/link";
import { FC } from "react";
import { RoomShort } from "../interfaces/RoomShort";

const RoomsListTile: FC<{ room: RoomShort }> = ({ room }) => {
  return (
    <Link href={`/${room.rid}`}>
      <div className="h-16 w-full lg:w-60 flex items-center justify-start sm:px-2 py-2 px-4 border border-x-0 border-t-0 border-indigo-300/30 md:border-b-0 lg:border-b text-gray-300 text-lg hover:bg-indigo-500/10">
        <img
          alt="room"
          src={room.image_url}
          className="h-10 rounded-full sm:mr-2 mr-3"
        />
        <h2 className="hover:underline sm:hidden lg:flex">{room.name}</h2>
      </div>
    </Link>
  );
};

export default RoomsListTile;
