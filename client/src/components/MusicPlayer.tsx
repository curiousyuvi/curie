import {
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsSkipEndFill,
  BsSkipStartFill,
} from "react-icons/bs";
import useRoomMusic from "../hooks/useRoomMusic";
import PlayerNotActive from "./PlayerNotActive";

const MusicPlayer = () => {
  const { active, currentTrack, paused, player, progress } = useRoomMusic();
  const handlePlay = () => {
    player?.resume();
    console.log("device id: ", player?._options.id);
  };

  const handlePause = () => {
    player?.pause();
  };
  const handlePrev = () => {
    player?.previousTrack();
  };
  const handleNext = () => {
    player?.nextTrack();
  };

  return (
    <div className="w-full bg-indigo-500 relative">
      {!active ? <PlayerNotActive /> : <></>}
      <div className="w-full flex flex-col">
        <div className="p-2 w-full h-24 flex items-center justify-start">
          <img
            src={currentTrack.thumbnail}
            alt="thumbnail"
            className="h-20 rounded"
          />
          <span className="mx-2" />
          <div className="w-full flex flex-col items-start justify-between">
            <p className="text-gray-100 font-medium overflow-hidden text-ellipsis w-full h-6">
              {currentTrack.name}
            </p>
            <span className="my-1" />
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
        </div>
        <div className="w-full bg-white/30 h-[0.2rem]">
          <div
            className="bg-white h-[0.2rem]"
            style={{
              width: `${(
                Math.ceil(progress * 100) / currentTrack.duration
              ).toString()}%`,
            }}
          ></div>
        </div>
        <div className="h-14 bg-white/10 flex justify-center items-center text-white/90 hover:text-white duration-100 text-3xl">
          <button onClick={handlePrev}>
            <BsSkipStartFill />
          </button>
          <span className="mx-2" />

          {paused ? (
            <button className="text-4xl" onClick={handlePlay}>
              <BsFillPlayCircleFill />{" "}
            </button>
          ) : (
            <button className="text-4xl" onClick={handlePause}>
              <BsPauseCircleFill />
            </button>
          )}

          <span className="mx-2" />

          <button onClick={handleNext}>
            <BsSkipEndFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
