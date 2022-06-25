import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const roomId = "ASKHDIQ3Q342KHKQE";
  const handleChange = (e: any) => {
    setRoomName(e.target.value);
  };
  //TODO: Create UI for create_room

  return (
    <div className="w-full h-full rounded-br-lg flex justify-center items-center bg-blue-900/70">
      <div className="w-full max-w-lg flex flex-col items-start p-4">
        <h1 className="flex w-full justify-center text-gray-200 text-4xl">
          Create a Room
        </h1>
        <span className="h-12" />
        <label className="font-medium">Write a room name</label>
        <span className="h-3" />
        <input
          type="text"
          value={roomName}
          onChange={handleChange}
          placeholder="Enter room name..."
          className="p-2 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg text-2xl w-full duration-200"
        />
        <span className="h-12" />
        <label className="font-medium">Choose an image for room</label>
        <span className="h-3" />
        <ChooseAvatar setAvatar={setAvatar} sprites={"adventurer-neutral"} />
        <span className="h-12" />
        <div className="flex items-center">
          <label className="font-medium mr-4">Room ID :</label>
          <span className="mr-4 font-medium text-2xl text-gray-200 underline decoration-indigo-500 decoration-1 decoration-dashed underline-offset-4">
            {roomId}
          </span>
          <button className="p-1 bg-indigo-500/50 hover:bg-indigo-500 rounded-lg flex items-center duration-300">
            <FiCopy className="mr-1" />
            copy
          </button>
        </div>
        <span className="h-2" />
        <label className="text-sm text-white/40">
          Note: This Room ID will be used when joining room
        </label>
        <span className="h-8" />
        <span className="w-full flex justify-center">
          <PrimaryButton onClick={() => {}}>CREATE ROOM</PrimaryButton>
        </span>
      </div>
    </div>
  );
}
