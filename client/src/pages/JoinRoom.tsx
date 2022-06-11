import { useState } from "react";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const handleChange = (e: any) => {
    setRoomId(e.target.value);
  };

  return (
    <div className="flex justify-center w-full h-full bg-blue-900/70 p-4 items-center">
      <div className="rounded-br-lg flex flex-col items-start">
        <input
          type="text"
          value={roomId}
          onChange={handleChange}
          placeholder="Enter room id to join..."
          className="mb-6 p-2 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg text-2xl w-full max-w-sm duration-200"
        />

        <button className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 rounded-lg duration-200 font-bold">
          JOIN ROOM
        </button>
      </div>
    </div>
  );
}
