import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import useRoomServices from "../hooks/useRoomServices";
import useUser from "../hooks/useUser";
import { Room } from "../interfaces/Room";
const roomContext = createContext<{ room: Room; loadRoom: () => void }>({
  room: {
    name: "Curie Room",
    rid: "curierid",
    image_url: "",
    users: [],
    messages: [],
    admins: [],
  },
  loadRoom: () => {},
});

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const generatePlaceholderAvatar = usePlaceholderAvatar();
  const placeholderAvatar = generatePlaceholderAvatar();
  const [room, setRoom] = useState<Room>({
    name: "Curie Room",
    rid: "curierid",
    image_url: placeholderAvatar,
    users: [],
    messages: [],
    admins: [],
  });
  const params = useParams();
  const { getRoom, joinUser, roomExists } = useRoomServices();
  const { joinRoom } = useUser();
  const { loadUser } = useAuth();
  const { user } = useAuth();

  const loadRoom = () => {
    const uid = localStorage.getItem("UID");
    if (params.rid && uid) {
      getRoom(params.rid).then((data) => {
        if (data) setRoom(data);
      });
      joinRoom(uid, params.rid);
      joinUser(params.rid, uid);
      loadUser();
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (params.rid)
      roomExists(params.rid).then((exists) => {
        if (exists) loadRoom();
        else navigate("/");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.rid, user]);

  return (
    <roomContext.Provider value={{ room, loadRoom }}>
      {children}
    </roomContext.Provider>
  );
};

export default RoomProvider;

export { roomContext };
