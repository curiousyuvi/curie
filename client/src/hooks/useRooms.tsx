import { useContext } from "react";
import { roomsContext } from "../providers/RoomsProvider";

const useRooms = () => useContext(roomsContext);

export default useRooms;
