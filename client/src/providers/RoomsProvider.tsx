import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { RoomShort } from "../interfaces/RoomShort";

const roomsContext = createContext<{
  rooms: RoomShort[];
}>({ rooms: [] });

const RoomsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomShort[]>([]);
  const { user } = useAuth();
  const { getRoomShort } = useRoom();
  useEffect(() => {
    user?.rooms.forEach((rid) => {
      getRoomShort(rid).then((data) => {
        data && setRooms([...rooms, data]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <roomsContext.Provider value={{ rooms }}>{children}</roomsContext.Provider>
  );
};

export default RoomsProvider;
export { roomsContext };
