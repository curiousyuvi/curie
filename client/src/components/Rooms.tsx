import { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";

export default function Rooms() {
  return (
    <div className="h-full bg-indigo-700/50 w-72 flex flex-col">
      <RoomsListTile roomName="Lofi Boys🤞" />
      <RoomsListTile roomName="🔥Rap for life" />
      <RoomsListTile roomName="Crazies...." />
      <RoomsListTile roomName="Money jiggle..." />
      <RoomsListTile roomName="Lofi Boys🤞" />
    </div>
  );
}

const RoomsListTile: FC<{ roomName: String }> = ({ roomName }) => {
  return (
    <div className="w-full h-12 flex items-center justify-start p-2 border border-x-0 border-t-0 border-indigo-300/30 text-gray-300 text-lg">
      <BsFillEmojiSmileFill className="mr-2 text-2xl text-yellow-400" />
      <label>{roomName}</label>
    </div>
  );
};
