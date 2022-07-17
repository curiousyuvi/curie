import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";
import useGenerateUniqueRandomString from "../hooks/useGenerateUniqueRandomString";
import useRoomServices from "../hooks/useRoomServices";
import useSocket from "../hooks/useSocket";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const { createRoom } = useRoomServices();
  const [avatar, setAvatar] = useState<string>("");
  const generateUniqueRandomString = useGenerateUniqueRandomString();
  const [roomID, setRoomID] = useState<string>("");
  const handleChange = (e: any) => {
    setRoomName(e.target.value);
  };
  const [validationIssue, setValidationIssue] = useState({ roomName: "" });
  const { socket } = useSocket();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(roomID);
    toast("Room ID copied to clipboard!", { icon: "✅" });
  };

  useEffect(() => {
    setRoomID(generateUniqueRandomString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const validate = () => {
    if (roomName === "") {
      setValidationIssue({
        ...validationIssue,
        roomName: "Room name can't be empty",
      });
      return false;
    } else if (roomName.length < 3) {
      setValidationIssue({
        ...validationIssue,
        roomName: "Room name can't be less than 3 charachters",
      });
      return false;
    } else {
      setValidationIssue({
        roomName: "",
      });
      return true;
    }
  };

  const handleCreateRoomClick = async () => {
    if (validate()) {
      await createRoom({
        rid: roomID,
        name: roomName,
        image_url: avatar,
        messages: [],
        users: [],
        admins: [localStorage.getItem("UID") || ""],
      });
      socket?.emit("send_create_room", {
        rid: roomID,
        uid: localStorage.getItem("UID") || "",
      });
      navigate(`/${roomID}`, { replace: true });
    }
  };

  return (
    <div className="w-full h-full rounded-br-lg flex flex-col items-center bg-blue-900/70">
      <div className="w-full h-12 sm:h-24 flex items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2 sm:hidden"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl mx-auto sm:text-4xl">
          Create a Room
        </h1>
        <span className="w-10" />
      </div>
      <div className="w-full h-full max-w-lg flex flex-col items-start justify-center p-4">
        <label className="font-medium">Write a room name</label>
        <span className="h-3" />
        <input
          type="text"
          value={roomName}
          onChange={handleChange}
          placeholder="Enter room name..."
          className="sm:p-2 p-1 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg sm:text-2xl text-lg w-full duration-200"
        />
        <span className="h-2" />
        <label className="text-sm text-red-500">
          {validationIssue.roomName}
        </label>
        <span className="sm:h-8 h-4" />
        <label className="font-medium">Choose an image for room</label>
        <span className="h-3" />
        <ChooseAvatar setAvatar={setAvatar} sprites={"adventurer-neutral"} />
        <span className="sm:h-8 h-4" />
        <div className="flex flex-col items-start">
          <label className="font-medium mb-2">Room ID</label>
          <div className="w-full flex">
            <span className="mr-4 font-medium text-sm sm:text-lg text-gray-200 underline decoration-indigo-500 decoration-1 decoration-dashed underline-offset-4">
              {roomID}
            </span>
            <button
              onClick={copyToClipBoard}
              className="p-1 bg-indigo-500/50 hover:bg-indigo-500 rounded-lg flex items-center duration-300"
            >
              <FiCopy className="mr-1" />
              copy
            </button>
          </div>
        </div>
        <span className="h-2" />
        <label className="text-sm text-white/40">
          Note: This Room ID will be used when joining room
        </label>
        <span className="sm:h-8 h-4" />
        <span className="w-full flex justify-center">
          <PrimaryButton onClick={handleCreateRoomClick}>
            CREATE ROOM
          </PrimaryButton>
        </span>
      </div>
    </div>
  );
}
