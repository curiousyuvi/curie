import { useState } from "react";
import { FiCopy } from "react-icons/fi";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const roomId = "ad134fafq1";
  const handleChange = (e: any) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="flex justify-center w-full h-full bg-blue-900/70 p-4 items-center">
      <div className="rounded-br-lg flex flex-col items-start">
        <input
          type="text"
          value={roomName}
          onChange={handleChange}
          placeholder="Enter room name..."
          className="mb-6 p-2 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg text-2xl w-full max-w-sm duration-200"
        />
        <div className="flex items-center mb-8">
          <label className="mr-2">Room Id :</label>
          <span className="mr-4 font-medium text-2xl text-gray-200 underline decoration-indigo-500 decoration-1 decoration-dashed underline-offset-4">
            {roomId}
          </span>
          <button className="p-1 bg-indigo-500/50 hover:bg-indigo-500 rounded-lg flex items-center duration-300">
            <FiCopy className="mr-1" />
            copy
          </button>
        </div>
        <button className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 rounded-lg duration-200 font-bold">
          CREATE ROOM
        </button>
      </div>
    </div>
  );
}
