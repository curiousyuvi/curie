import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";
import useGenerateUniqueRandomString from "../hooks/useGenerateUniqueRandomString";
import useToast from "../hooks/useToast";
import useCreateRoom from "../hooks/useCreateRoom";
// import useSocket from "../hooks/useSocket";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const generateUniqueRandomString = useGenerateUniqueRandomString();
  const [roomID, setRoomID] = useState<string>("");
  const router = useRouter();
  const handleChange = (e: any) => {
    setRoomName(e.target.value);
  };
  const [validationIssue, setValidationIssue] = useState({ roomName: "" });
  const { successToast } = useToast();

  const createRoomMutation = useCreateRoom(() => {
    successToast("Room created successfully");
    router.replace(`/${roomID}`);
  });

  //   const { socket } = useSocket();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(roomID);
    toast("Room ID copied to clipboard!", { icon: "✅" });
  };

  useEffect(() => {
    setRoomID(generateUniqueRandomString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      createRoomMutation.mutate({
        rid: roomID,
        name: roomName,
        image_url: avatar,
      });
    }
  };

  return (
    <div className="w-full h-full rounded-br-lg flex flex-col justify-start items-center gap-2 bg-blue-900/70">
      <div className="w-full h-[calc(100%] overflow-y-auto p-4 pb-12">
        <div className="w-full h-12 sm:h-24 flex justify-center items-center">
          <h1 className="text-gray-200 text-2xl sm:text-4xl py-1">
            Create a Room
          </h1>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-lg flex flex-col gap-2 items-center justify-center">
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
            <h1 className="font-medium">Choose an image for room</h1>
            <span className="h-3" />
            <ChooseAvatar
              setAvatar={setAvatar}
              sprites={"adventurer-neutral"}
              marble
            />
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
      </div>
    </div>
  );
}
