import { Outlet } from "react-router-dom";
import RoomMusicProvider from "../providers/RoomMusicProvider";
import RoomsProvider from "../providers/RoomsProvider";
import SocketProvider from "../providers/SocketProvider";
import Header from "./Header";
import Navbar from "./Navbar";
import WebPlaybackWrapper from "./WebPlaybackWrapper";

export default function ChatWrapper() {
  return (
    <SocketProvider>
      <RoomMusicProvider>
        <WebPlaybackWrapper>
          <RoomsProvider>
            <div className="flex flex-col w-full h-full max-w-6xl">
              <Header />
              <div className="w-full h-full flex flex-col-reverse sm:flex-row">
                <Navbar />
                <div className="h-full w-full rounded-none sm:rounded-b-lg sm:rounded-bl-none overflow-hidden">
                  <Outlet />
                </div>
              </div>
            </div>
          </RoomsProvider>
        </WebPlaybackWrapper>
      </RoomMusicProvider>
    </SocketProvider>
  );
}
