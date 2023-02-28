// import { useRouter } from "next/router";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
// import { useSelector } from "react-redux";
import useRoomMusic from "../hooks/useRoomMusic";
// import useSocket from "../hooks/useSocket";
// import { RootState } from "../store";

const MusicPlayer = () => {
  const { currentTrack, paused, progress, playpause, duration } =
    useRoomMusic();

  // const { socket } = useSocket();
  // const { currentUser } = useSelector((state: RootState) => state.user);

  // const uid = localStorage.getItem("UID");
  // const router = useRouter();

  const handlePlay = async () => {
    playpause(true);
    // TODO: implement sync player
    // socket?.emit("send_play_pause", {
    //   uid: currentUser?.uid,
    //   rid: router.query.rid,
    //   play: true,
    // });
  };

  const handlePause = () => {
    playpause(false);
    // TODO: implement sync player
    // socket?.emit("send_play_pause", {
    //   uid: currentUser?.uid,
    //   rid: router.query.rid,
    //   play: false,
    // });
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
