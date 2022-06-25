import { Outlet } from "react-router-dom";
import RoomsListTile from "../components/RoomsListTile";
import useRooms from "../hooks/useRooms";

export default function Rooms() {
  const { rooms } = useRooms();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full bg-indigo-700/50 w-72 flex flex-col border-r border-indigo-300/30">
        {rooms.length > 0 ? (
          rooms.map((room) => {
            return (
              <RoomsListTile
                room={{
                  rid: room.rid,
                  name: room.name,
                  image_url: room.image_url,
                }}
              />
            );
          })
        ) : (
          //TODO: UI for new user with no rooms
          <></>
        )}
      </div>
      <Outlet />
    </div>
  );
}
