import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack, IoPencil } from "react-icons/io5";
import OutlineButton from "../components/OutlineButton";
import RoomMemberList from "../components/RoomMemberList";
import useRoom from "../hooks/useRoom";
import { TbCopy, TbDoorExit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import useRoomServices from "../hooks/useRoomServices";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useToast from "../hooks/useToast";
import useSocket from "../hooks/useSocket";

export default function ChatRoomDetails() {
  const params = useParams();
  const { removeUser, deleteRoom, removeAdmin } = useRoomServices();
  const { loadUser } = useAuth();
  const { removeRoom } = useUser();
  const { user } = useAuth();
  const { room, userShorts } = useRoom();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLeaveRoom = async () => {
    navigate("/");
    if (socket && user)
      socket.emit("send_leave_room", {
        uid: user.uid,
        rid: params.rid,
      });
    await removeUser(room.rid, localStorage.getItem("UID") || "");
    await removeAdmin(room.rid, localStorage.getItem("UID") || "");
    await removeRoom(localStorage.getItem("UID") || "", room.rid);
    await loadUser();
  };
  const handleDeleteRoom = async () => {
    navigate("/");
    await removeUser(room.rid, localStorage.getItem("UID") || "");
    await removeRoom(localStorage.getItem("UID") || "", room.rid);
    await deleteRoom(room.rid);
    await loadUser();
  };

  const { successToast } = useToast();

  const handleCopyRoomID = () => {
    navigator.clipboard.writeText(room.rid);
    successToast("Room ID copied to clipboard!");
  };

  const handleEditClick = () => {
    navigate(`/${room.rid}/edit`);
  };

  return (
    <div className="h-full bg-blue-900/70 w-full flex flex-col">
      <div className="w-full h-12 flex justify-between items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl">Room Details</h1>
        <span className="w-10" />
      </div>
      <div className="w-full sm:h-[calc(100vh-10rem)] h-[calc(100vh-12rem)] p-4 flex flex-col items-center overflow-y-auto relative">
        <div className="absolute w-full h-[40rem] translate-y-[-28rem] rounded-full bg-indigo-500/50 z-[-1]"></div>

        <span className="my-[2.8rem]" />
        <img
          src={room.image_url}
          alt="Room"
          className="h-60 rounded-full p-2 border-4 border-white bg-[#25317A]"
        />
        <span className="my-2" />
        <h2 className="text-4xl text-white">{room.name}</h2>
        <span className="my-3" />
        <span>
          <OutlineButton onClick={handleEditClick}>
            <span className="flex items-center justify-center">
              <IoPencil />
              <span className="mx-1" />
              Edit Room
            </span>
          </OutlineButton>
        </span>
        <span className="my-2" />
        <span>
          <OutlineButton type="indigo" onClick={handleCopyRoomID}>
            <span className="flex items-center justify-center">
              <TbCopy />
              <span className="mx-1" />
              Copy RoomID
            </span>
          </OutlineButton>
        </span>
        <span className="my-3" />
        <div className="w-full">
          <h2 className="text-2xl">Members</h2>
          <hr className="border-indigo-300/30 my-1" />
          <RoomMemberList userShorts={userShorts} admins={room.admins} />
        </div>
        <span className="my-3" />
        <div className="flex items-center w-full justify-center">
          <span>
            <OutlineButton type="orange" onClick={handleLeaveRoom}>
              <span className="flex items-center justify-center">
                <TbDoorExit />
                <span className="mx-1" />
                Leave Room
              </span>
            </OutlineButton>
          </span>
          <span className="mx-2" />
          {room.admins.includes(localStorage.getItem("UID") || "") ? (
            <span>
              <OutlineButton type="red" onClick={handleDeleteRoom}>
                <span className="flex items-center justify-center">
                  <RiDeleteBin6Line />
                  <span className="mx-1" />
                  Delete Room
                </span>
              </OutlineButton>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
