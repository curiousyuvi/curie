import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RoomsListTile from "./RoomsListTile";

export default function Rooms() {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full bg-indigo-700/50 w-72 flex flex-col border-r border-indigo-300/30">
        {/* //TODO: implement Room Tiles */}
        {/* {user?.rooms.map((room) => {
          return <RoomsListTile room={room} />;
        })} */}
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: "someurl",
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: "someurl",
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: "someurl",
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: "someurl",
            state: "idle",
          }}
        />
      </div>
      <Outlet />
    </div>
  );
}
