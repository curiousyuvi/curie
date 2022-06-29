import { GiBootKick } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import { TbStarOff } from "react-icons/tb";
import useRoom from "../hooks/useRoom";
import useRoomServices from "../hooks/useRoomServices";
import { UserShort } from "../interfaces/UserShort";

const RoomMemberOptions = ({ user }: { user: UserShort }) => {
  const { room, loadRoom } = useRoom();
  const { removeUser, addAdmin, removeAdmin } = useRoomServices();
  const handelMakeAdmin = async () => {
    await addAdmin(room.rid, user.uid);
    loadRoom();
  };
  const handelRemoveAdmin = async () => {
    await removeAdmin(room.rid, user.uid);
    loadRoom();
  };
  const handelKickOut = async () => {
    await removeUser(room.rid, user.uid);
    loadRoom();
  };

  return (
    <div className="absolute bg-white text-gray-600 rounded overflow-hidden">
      <ul>
        {(!room.admins.includes(user.uid) &&
          room.admins.includes(localStorage.getItem("UID") || "")) ||
        room.admins.length === 0 ? (
          <li className="">
            <button
              onClick={handelMakeAdmin}
              className="w-full border border-x-0 border-t-0 border-indigo-300/30 p-2 flex items-center text-green-600 bg-green-500/20"
            >
              <RiUserStarLine />
              <span className="mx-1" /> Make Admin
            </button>
          </li>
        ) : (
          <></>
        )}
        {room.admins.includes(user.uid) ? (
          <li>
            <button
              onClick={handelRemoveAdmin}
              className="w-full border border-x-0 border-t-0 border-indigo-300/30 p-2 flex items-center text-orange-600 bg-orange-500/20"
            >
              <TbStarOff />
              <span className="mx-1" /> Remove Admin
            </button>
          </li>
        ) : (
          <></>
        )}
        {!(user.uid === localStorage.getItem("UID")) ? (
          <li>
            <button
              onClick={handelKickOut}
              className="w-full border border-x-0 border-t-0 border-indigo-300/30 p-2 flex items-center text-red-600 bg-red-500/20"
            >
              <GiBootKick /> <span className="mx-1" /> Kick Out
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default RoomMemberOptions;
