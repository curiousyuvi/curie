import { useRouter } from "next/router";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import useRoomMusic from "../hooks/useRoomMusic";
import useSocket from "../hooks/useSocket";
import { RootState } from "../store";
import { useEffect } from "react";
import { getUnixEpochTime } from "../helpers/epoch";
import { updateLastTrackAPI } from "../services/apiServices";
import { Track } from "../interfaces/Track";
import { User } from "../interfaces/User";

const MusicPlayer = () => {
  const {
    currentTrack,
    paused,
    progress,
    duration,
    playpause,
    changeTrack,
    player,
  } = useRoomMusic();

  const { socket } = useSocket();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const handlePlay = async () => {
    playpause(true);
    socket?.emit("send_play_pause", {
      uid: currentUser?.uid,
      rid: router.query.rid,
      play: true,
      progress,
    });
  };

  const handlePause = () => {
    playpause(false);
    socket?.emit("send_play_pause", {
      uid: currentUser?.uid,
      rid: router.query.rid,
      play: false,
      progress,
    });
  };

  const handleReceivePlayPauseSocket = ({
    uid,
    rid,
    play,
  }: {
    uid: string;
    rid: string;
    play: boolean;
  }) => {
    if (rid === router?.query?.rid) {
      if (play) {
        playpause(true);
      } else {
        playpause(false);
      }
    }
  };

  const handleReceivePlayTrackSocket = ({
    user,
    rid,
    track,
  }: {
    user: User;
    rid: string;
    track: Track;
  }) => {
    if (rid === router.query.rid) {
      changeTrack(track);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_play_pause", handleReceivePlayPauseSocket);
      socket.on("receive_play_track", handleReceivePlayTrackSocket);
    }

    return () => {
      socket?.off("receive_play_pause", handleReceivePlayPauseSocket);
      socket?.off("receive_play_track", handleReceivePlayTrackSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, router, player]);

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
          <div className="w-full flex flex-col items-start justify-between max-w-[8rem] sm:max-w-[12rem]">
            <p className="text-gray-100 font-medium overflow-hidden text-ellipsis w-full h-6">
              {currentTrack.name}
            </p>
            <span className="mt-1" />
            <p className="text-sm overflow-hidden text-ellipsis w-full h-4">
              <span className="mr-2">{currentTrack.channel}</span>
            </p>
          </div>
          {paused ? (
            <button
              className="text-4xl text-white/90 hover:text-white hover:scale-110"
              onClick={handlePlay}
            >
              <BsFillPlayCircleFill />
            </button>
          ) : (
            <button
              className="text-4xl text-white/90 hover:text-white hover:scale-110"
              onClick={handlePause}
            >
              <BsPauseCircleFill />
            </button>
          )}
        </div>
        <div className="w-full bg-white/30 h-[0.2rem] rounded-full overflow-hidden">
          <div
            className="bg-white h-[0.2rem]"
            style={{
              width: `${(Math.ceil(progress * 100) / duration).toString()}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
