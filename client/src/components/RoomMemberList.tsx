import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { UserShort } from "../interfaces/UserShort";
import RoomMemberListTile from "./RoomMemberListTile";

const RoomMemberList = ({
  users,
  admins,
}: {
  users: string[];
  admins: string[];
}) => {
  const [userShorts, setUserShorts] = useState<UserShort[]>([]);
  const { user } = useAuth();
  const { getUserShort } = useUser();
  const loadRoomMemberList = async () => {
    let result: UserShort[] = [];
    if (users.find((e) => e === localStorage.getItem("UID"))) {
      result.push({
        uid: user?.uid || "",
        name: "You",
        username: user?.username || "",
        status: user?.status || "",
        avatar_url: user?.avatar_url || "",
      });
    }

    const promises1 = admins.map(async (uid) => {
      const data = await getUserShort(uid);
      if (data) if (!result.find((e) => e.uid === data.uid)) result.push(data);
    });

    const promises2 = users.map(async (uid) => {
      const data = await getUserShort(uid);
      if (data) if (!result.find((e) => e.uid === data.uid)) result.push(data);
    });

    await Promise.all([...promises1, ...promises2]);

    setUserShorts(result);
  };
  useEffect(() => {
    loadRoomMemberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, admins]);
  return (
    <div>
      {userShorts.map((userShort) => {
        return (
          <RoomMemberListTile
            key={userShort.uid}
            user={userShort}
          ></RoomMemberListTile>
        );
      })}
    </div>
  );
};

export default RoomMemberList;
