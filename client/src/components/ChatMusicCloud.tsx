import { FC } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDateTimeHelper from "../hooks/useDateTimeHelper";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import { Message } from "../interfaces/Message";
import { Track } from "../interfaces/Track";

const ChatMusicCloud: FC<{ message: Message }> = ({ message }) => {
  const { userShorts } = useRoom();
  const { user } = useAuth();
  const getUserShort = (uid: string) => {
    return userShorts.find((e) => e.uid === uid);
  };
  const { socket } = useSocket();
  const track: Track = JSON.parse(message.content);
  const params = useParams();

  const { dateFromMid, formatTime } = useDateTimeHelper();
  const handlePlayClick = () => {
    socket?.emit("send_play_track", {
      uid: user?.uid,
      rid: params.rid,
      track: track,
    });
  };

  return (
    <div className="w-full flex items-start my-2">
      <img
        src={getUserShort(message.sender)?.avatar_url}
        alt="avatar"
        className="mr-2 h-8 rounded-full"
      />
      <div className="w-full flex flex-col items-start">
        <div
          className={`sm:max-w-[calc(70%)] max-w-[calc(85%)]  min-w-[4rem] px-3 py-2 ${
            !(message.sender === user?.uid)
              ? "bg-indigo-500/30"
              : "bg-indigo-500/80"
          } border border-indigo-300/20 rounded-lg rounded-bl-none flex flex-col items-start justify-start`}
        >
          <span
            className={`${
              !(message.sender === user?.uid) ? "text-indigo-400" : "hidden"
            } text-sm font-medium`}
          >
            {getUserShort(message.sender)?.name}
          </span>
          <p className="w-full text-gray-200">{"🎵 Started playing"}</p>
          <span className="my-1" />
          <button
            onClick={handlePlayClick}
            className="w-full h-20 p-1 bg-indigo-500 drop-shadow-lg border border-indigo-300/20 rounded-lg flex items-center justify-start overflow-hidden"
          >
            <div className="group h-full w-[6rem] rounded overflow-hidden flex items-center relative">
              <img
                src={track.thumbnail}
                alt="thumbnail"
                className="w-auto h-full"
              />

              <IoPlayCircleOutline className="p-3 text-4xl absolute opacity-0 group-hover:opacity-100 duration-300 h-full w-full bg-black/50 flex justify-center items-center text-white" />
            </div>
            <span className="mx-2" />
            <div className="w-full whitespace-nowrap">
              <h1 className="sm:w-[16rem] w-[8rem] text-left text-gray-200 overflow-hidden text-ellipsis font-medium">
                {track.name}
              </h1>
              <span className="my-1" />
              <p className="sm:w-[16rem] w-[8rem] text-left text-sm overflow-hidden text-ellipsis h-4">
                {track.artists.map((artist, i) => {
                  return (
                    <span key={i} className="mr-2">
                      {artist}
                    </span>
                  );
                })}
              </p>
            </div>
          </button>
        </div>
        <span className="text-sm text-gray-400 ml-1">
          {formatTime(dateFromMid(message?.mid || ""))}
        </span>
      </div>
    </div>
  );
};

export default ChatMusicCloud;
