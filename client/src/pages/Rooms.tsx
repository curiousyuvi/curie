import { Outlet } from "react-router-dom";
import RoomsListTile from "../components/RoomsListTile";
import useGenerateRandomAvatar from "../hooks/useGenerateRandomAvatar";

export default function Rooms() {
  const generateRandomAvatar = useGenerateRandomAvatar();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full bg-indigo-700/50 w-72 flex flex-col border-r border-indigo-300/30">
        {/* //TODO: UI for new user with no rooms */}
        {/* //TODO: implement Room Tiles */}
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: generateRandomAvatar(),
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: generateRandomAvatar(),
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: generateRandomAvatar(),
            state: "idle",
          }}
        />
        <RoomsListTile
          room={{
            rid: "121212",
            name: "lofi",
            image_url: generateRandomAvatar(),
            state: "idle",
          }}
        />
      </div>
      <Outlet />
    </div>
  );
}
