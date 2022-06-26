import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import { IoArrowRedo, IoArrowRedoOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import NavbarLinkButton from "../components/NavbarLinkButton";
import NoRooms from "../components/NoRooms";
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
          <NoRooms />
        )}
      </div>
      <Outlet />
    </div>
  );
}
