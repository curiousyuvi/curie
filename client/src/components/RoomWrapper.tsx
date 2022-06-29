import React from "react";
import { Outlet } from "react-router-dom";
import RoomProvider from "../providers/RoomProvider";

const RoomWrapper = () => {
  return (
    <RoomProvider>
      <Outlet />
    </RoomProvider>
  );
};

export default RoomWrapper;
