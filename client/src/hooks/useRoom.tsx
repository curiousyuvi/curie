import { useContext } from "react";
import { roomContext } from "../providers/RoomProvider";

const useRoom = () => useContext(roomContext);

export default useRoom;
