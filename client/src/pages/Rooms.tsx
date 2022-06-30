import { Outlet, useLocation } from "react-router-dom";
import NoRooms from "../components/NoRooms";
import RoomsListTile from "../components/RoomsListTile";
import useRooms from "../hooks/useRooms";

export default function Rooms() {
  const { rooms } = useRooms();
  const location = useLocation();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className={"h-full bg-indigo-700/50 w-full sm:w-auto flex-col sm:border-r border-indigo-300/30 ".concat(
          location.pathname === "/" ? "flex" : "hidden border-r-0 sm:flex"
        )}
      >
        {rooms.length > 0 ? (
          rooms.map((room) => {
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
      <div
        className={"h-full w-full ".concat(
          location.pathname === "/" ? "hidden sm:flex" : ""
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
