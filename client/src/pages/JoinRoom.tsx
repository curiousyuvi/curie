import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import useRoomServices from "../hooks/useRoomServices";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const [validationIssue, setValidationIssue] = useState<string>("");
  const handleChange = (e: any) => {
    setRoomId(e.target.value);
  };
  const navigate = useNavigate();
  const { roomExists } = useRoomServices();

  //TODO: Update UI for join_room
  const handleBackClick = () => {
    navigate("/");
  };

  const validate = async () => {
    const exists = await roomExists(roomId);

    if (!exists) {
      setValidationIssue("No room found");
      return false;
    } else {
      setValidationIssue("");
      return true;
    }
  };

  const handleJoinRoom = async () => {
    if (await validate()) {
      navigate(`/${roomId}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-blue-900/70 p-4 justify-start">
      <div className="w-full h-12 sm:h-24 flex items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2 sm:hidden"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl mx-auto sm:text-4xl">
          Join a Room
        </h1>
        <span className="w-10" />
      </div>
      <div className="h-full rounded-br-lg flex flex-col items-start justify-center">
        <input
          type="text"
          value={roomId}
          onChange={handleChange}
          placeholder="Enter room id to join..."
          className="p-2 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg sm:text-2xl w-full max-w-sm duration-200"
        />
        <span className="my-1" />
        <label className="text-sm text-red-500/80">{validationIssue}</label>
        <span className="my-4" />

        <PrimaryButton onClick={handleJoinRoom}>JOIN ROOM</PrimaryButton>
      </div>
    </div>
  );
}
