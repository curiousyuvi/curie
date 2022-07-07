import { Outlet } from "react-router-dom";
import RoomMusicProvider from "../providers/RoomMusicProvider";
import RoomsProvider from "../providers/RoomsProvider";
import Header from "./Header";
import Navbar from "./Navbar";
import WebPlaybackWrapper from "./WebPlaybackWrapper";

export default function ChatWrapper() {
  return (
    <RoomMusicProvider>
      <WebPlaybackWrapper>
        <RoomsProvider>
          <div className="flex flex-col w-full h-full max-w-6xl">
            <Header />
            <div className="w-full h-full flex ">
              <Navbar />
              <div className="h-full w-full rounded-b-lg sm:rounded-bl-none overflow-hidden">
                <Outlet />
              </div>
            </div>
          </div>
        </RoomsProvider>
      </WebPlaybackWrapper>
    </RoomMusicProvider>
  );
}
