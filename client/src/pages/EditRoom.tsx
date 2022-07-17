import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";
import useRoom from "../hooks/useRoom";
import useRoomServices from "../hooks/useRoomServices";

export default function EditRoom() {
  const { room } = useRoom();
  const [roomName, setRoomName] = useState<string>(room.name);
  const previousAvatar = room.image_url;
  const [avatar, setAvatar] = useState<string>("");
  const handleChange = (e: any) => {
    setRoomName(e.target.value);
  };
  const { updateRoom } = useRoomServices();
  const { loadRoom } = useRoom();
  const [validationIssue, setValidationIssue] = useState({ roomName: "" });

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

  const handleUpdateRoomClick = async () => {
    if (validate()) {
      await updateRoom(room.rid, { name: roomName, image_url: avatar });
      loadRoom();
      navigate(-1);
    }
  };

  return (
    <div className="w-full h-full rounded-br-lg flex flex-col items-center bg-blue-900/70">
      <div className="w-full h-12 flex justify-between items-center">
        <button
          className="text-2xl hover:text-white duration-100 mx-2"
          onClick={handleBackClick}
        >
          <IoArrowBack />
        </button>
        <h1 className="text-gray-200 text-2xl">Edit Room</h1>
        <span className="w-10" />
      </div>
      <div className="w-full h-full max-w-lg flex flex-col items-start justify-center p-4">
        <label className="font-medium">Update room name</label>
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
        <label className="font-medium">Update image for room</label>
        <span className="h-3" />
        <ChooseAvatar
          previousAvatar={previousAvatar}
          setAvatar={setAvatar}
          sprites={"adventurer-neutral"}
        />
        <span className="sm:h-8 h-4" />
        <span className="w-full flex justify-center">
          <PrimaryButton onClick={handleUpdateRoomClick}>
            UPDATE ROOM
          </PrimaryButton>
        </span>
      </div>
    </div>
  );
}
