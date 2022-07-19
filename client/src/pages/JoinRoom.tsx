import { useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import useRoomServices from "../hooks/useRoomServices";
import girlListeningMusicAnimation from "../assets/girl_listening_to_music_lootie.json";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const [validationIssue, setValidationIssue] = useState<string>("");
  const handleChange = (e: any) => {
    setRoomId(e.target.value);
  };
  const navigate = useNavigate();
  const { roomExists } = useRoomServices();

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
        <h1 className="text-gray-200 text-2xl mx-auto sm:text-4xl">
          Join a Room
        </h1>
      </div>
      <div className="h-full w-full rounded-br-lg flex flex-col items-center justify-start">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: girlListeningMusicAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={230}
          width={250}
        />
        <p className="px-2 text-center">
          {"Join a Room, 💬 chat and 🎵 vibe on music with your friends"}
        </p>
        <span className="my-5" />
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
