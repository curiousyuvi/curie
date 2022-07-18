import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import useRoom from "../hooks/useRoom";
import useRoomMusic from "../hooks/useRoomMusic";
import useSocket from "../hooks/useSocket";

const MusicPlayer = () => {
  const { currentTrack, paused, progress } = useRoomMusic();
  const { token } = useAuth();
  const apiPrivate = useApiPrivate();
  const { play, pause } = useMusic();
  const { socket } = useSocket();
  const { user } = useAuth();
  const { room } = useRoom();
  const uid = localStorage.getItem("UID");
  const params = useParams();

  const isAdmin = () => {
    if (room.admins.find((admin: string) => admin === uid)) return true;
    else return false;
  };

  const handlePlay = () => {
    play(token, apiPrivate);
    socket?.emit("send_play_pause", {
      uid: user?.uid,
      rid: params.rid,
      play: true,
    });
  };

  const handlePause = () => {
    pause(token, apiPrivate);
    socket?.emit("send_play_pause", {
      uid: user?.uid,
      rid: params.rid,
      play: false,
    });
  };

  return (
    <div className="w-full absolute bottom-0 left-0 right-0 px-4 pb-4">
      <div className="w-full bg-indigo-500 flex flex-col rounded-lg px-2 drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]">
        <div className="p-2 w-full h-20 flex items-center justify-start">
          <img
            src={currentTrack.thumbnail}
            alt="thumbnail"
            className="h-14 rounded"
          />
          <span className="mx-2" />
          <div className="w-full flex flex-col items-start justify-between">
            <p className="text-gray-100 font-medium overflow-hidden text-ellipsis w-full h-6">
              {currentTrack.name}
            </p>
            <span className="mt-1" />
            <p className="text-sm overflow-hidden text-ellipsis w-full h-4">
              {currentTrack.artists.map((artist, i) => {
                return (
                  <span key={i} className="mr-2">
                    {artist}
                  </span>
                );
              })}
            </p>
          </div>
          {paused ? (
            <button
              className={`text-4xl ${
                !isAdmin()
                  ? "cursor-not-allowed text-white/70"
                  : "text-white/90 hover:text-white hover:scale-110"
              }`}
              onClick={handlePlay}
              disabled={!isAdmin()}
            >
              <BsFillPlayCircleFill />
            </button>
          ) : (
            <button
              className={`text-4xl ${
                !isAdmin()
                  ? "cursor-not-allowed text-white/70"
                  : "text-white/90 hover:text-white hover:scale-110"
              }`}
              onClick={handlePause}
              disabled={!isAdmin()}
            >
              <BsPauseCircleFill />
            </button>
          )}
        </div>
        <div className="w-full bg-white/30 h-[0.2rem] rounded-full overflow-hidden">
          <div
            className="bg-white h-[0.2rem]"
            style={{
              width: `${(
                Math.ceil(progress * 100) / currentTrack.duration
              ).toString()}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
