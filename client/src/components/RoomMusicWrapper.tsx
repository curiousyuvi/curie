import React from "react";
import { Outlet } from "react-router-dom";
import RoomMusicProvider from "../providers/RoomMusicProvider";
import WebPlaybackWrapper from "./WebPlaybackWrapper";

const RoomMusicWrapper = () => {
  return (
    <RoomMusicProvider>
      <WebPlaybackWrapper>
        <Outlet />
      </WebPlaybackWrapper>
    </RoomMusicProvider>
  );
};

export default RoomMusicWrapper;
