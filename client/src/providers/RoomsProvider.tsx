import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useAuth from "../hooks/useAuth";
import useRoomServices from "../hooks/useRoomServices";
import { RoomShort } from "../interfaces/RoomShort";

const roomsContext = createContext<{
  rooms: RoomShort[];
}>({ rooms: [] });

const RoomsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomShort[]>([]);
  const { user } = useAuth();
  const { getRoomShort } = useRoomServices();
  const loadRooms = async () => {
    let result: RoomShort[] = [];
    const promises = user?.rooms.map(async (rid) => {
      const data = await getRoomShort(rid);
      if (data) result.push(data);
    });

    if (promises) await Promise.all(promises);

    setRooms(result);
  };
  useEffect(() => {
    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <roomsContext.Provider value={{ rooms }}>{children}</roomsContext.Provider>
  );
};

export default RoomsProvider;
export { roomsContext };
