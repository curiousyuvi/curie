import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { CurrentRoom } from "../interfaces/CurrentRoom";
import useRoom from "../hooks/useRoom";

const roomContext = createContext<{
  currentRoom: CurrentRoom | null;
  switchRoom: (rid: string) => void;
}>({ currentRoom: null, switchRoom: (rid) => {} });

const RoomProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<CurrentRoom | null>(null);
  const { getRoom } = useRoom();
  const handleSwitchRoom = (rid: string) => {
    getRoom(rid).then((data) => {
      setCurrentRoom(data);
    });
  };
  return (
    <roomContext.Provider
      value={{ currentRoom: currentRoom, switchRoom: handleSwitchRoom }}
    >
      {children}
    </roomContext.Provider>
  );
};

const useRoomContext = () => useContext(roomContext);

export default RoomProvider;
export { useRoomContext };
