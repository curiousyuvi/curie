import { useRouter } from "next/router";
import React from "react";
import NoRooms from "./NoRooms";
import RoomsListTile from "./RoomsListTile";

const RoomsList = () => {
  const router = useRouter();
  const rooms: any = [];

  return (
    <div
      className={"h-full bg-indigo-700/50 w-full md:w-auto flex-col sm:border-r border-indigo-300/30 ".concat(
        router.pathname === "/" ? "flex" : "hidden border-r-0 sm:flex"
      )}
    >
      {rooms.length > 0 ? (
        rooms.map((room: any) => {
          return (
            <RoomsListTile
              key={room.rid}
              room={{
                rid: room.rid,
                name: room.name,
                image_url: room.image_url,
              }}
            />
          );
        })
      ) : (
        <NoRooms />
      )}
    </div>
  );
};

export default RoomsList;
