import {
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsSkipEndFill,
  BsSkipStartFill,
} from "react-icons/bs";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import useRoomMusic from "../hooks/useRoomMusic";
import PlayerNotActive from "./PlayerNotActive";

const MusicPlayer = () => {
  const { active, currentTrack, paused, progress } = useRoomMusic();
  const { token } = useAuth();
  const apiPrivate = useApiPrivate();
  const { play, pause, next, previous } = useMusic();
  const handlePlay = () => {
    play(token, apiPrivate);
  };

  const handlePause = () => {
    pause(token, apiPrivate);
  };
  const handlePrev = () => {
    previous(token, apiPrivate);
  };
  const handleNext = () => {
    next(token, apiPrivate);
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
            <button className="text-4xl hover:scale-110" onClick={handlePlay}>
              <BsFillPlayCircleFill />{" "}
            </button>
          ) : (
            <button
              className="text-4xl hover:scale-110 duration-100"
              onClick={handlePause}
            >
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
