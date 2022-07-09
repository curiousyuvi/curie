import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import useRoomServices from "../hooks/useRoomServices";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";
import { Room } from "../interfaces/Room";
import { UserShort } from "../interfaces/UserShort";
const roomContext = createContext<{
  room: Room;
  loadRoom: () => void;
  userShorts: UserShort[];
}>({
  room: {
    name: "",
    rid: "",
    image_url: "",
    users: [],
    messages: [],
    admins: [],
  },
  loadRoom: () => {},
  userShorts: [],
});

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const generatePlaceholderAvatar = usePlaceholderAvatar();
  const placeholderAvatar = generatePlaceholderAvatar();
  const [room, setRoom] = useState<Room>({
    name: "",
    rid: "",
    image_url: placeholderAvatar,
    users: [],
    messages: [],
    admins: [],
  });
  const params = useParams();
  const { getRoom, joinUser, roomExists } = useRoomServices();
  const { joinRoom, getUserShort } = useUser();
  const { loadUser } = useAuth();
  const [userShorts, setUserShorts] = useState<UserShort[]>([]);
  const { user } = useAuth();
  const { socket } = useSocket();

  const loadRoomMemberList = async () => {
    let result: UserShort[] = [];
    if (room.users.find((e) => e === localStorage.getItem("UID"))) {
      result.push({
        uid: user?.uid || "",
        name: "You",
        username: user?.username || "",
        status: user?.status || "",
        avatar_url: user?.avatar_url || "",
      });
    }

    const promises1 = room.admins.map(async (uid) => {
      const data = await getUserShort(uid);
      if (data) if (!result.find((e) => e.uid === data.uid)) result.push(data);
    });

    const promises2 = room.users.map(async (uid) => {
      const data = await getUserShort(uid);
      if (data) if (!result.find((e) => e.uid === data.uid)) result.push(data);
    });

    await Promise.all([...promises1, ...promises2]);

    setUserShorts(result);
  };
  useEffect(() => {
    loadRoomMemberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const loadRoom = async () => {
    const uid = localStorage.getItem("UID");
    if (params.rid && uid) {
      if (socket) {
        socket.emit("send_join_room", {
          uid: uid,
          rid: params.rid,
        });
      }
      await joinRoom(uid, params.rid);
      await joinUser(params.rid, uid);

      const data = await getRoom(params.rid);
      if (data) setRoom(data);

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
  }, [params.rid, socket]);

  const handleReceiveJoinRoomSocket = async ({
    uid,
    rid,
  }: {
    uid: string;
    rid: string;
  }) => {
    if (rid === room.rid) {
      const newUserShort = await getUserShort(uid);
      if (newUserShort) {
        if (!userShorts.find((userShort) => userShort.uid === uid))
          setUserShorts([...userShorts, newUserShort]);
      }
    }
  };

  const handleReceiveLeaveRoomSocket = async ({
    uid,
    rid,
  }: {
    uid: string;
    rid: string;
  }) => {
    if (rid === room.rid) {
      setUserShorts(userShorts.filter((userShort) => userShort.uid !== uid));
    }
  };

  useEffect(() => {
    socket?.on("receive_join_room", handleReceiveJoinRoomSocket);
    socket?.on("receive_leave_room", handleReceiveLeaveRoomSocket);

    return () => {
      socket?.off("receive_join_room", handleReceiveJoinRoomSocket);
      socket?.off("receive_leave_room", handleReceiveLeaveRoomSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userShorts]);

  return (
    <roomContext.Provider value={{ room, loadRoom, userShorts }}>
      {children}
    </roomContext.Provider>
  );
};

export default RoomProvider;

export { roomContext };
