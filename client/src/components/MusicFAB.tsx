import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import useRoomMusic from "../hooks/useRoomMusic";
import Lottie from "react-lottie";
import waveAnimation from "../assets/wave_lottie.json";
import floatingMusicAnimation from "../assets/floating_music_lottie.json";

const MusicFAB = ({
  musicModalOpen,
  setMusicModalOpen,
}: {
  musicModalOpen: boolean;
  setMusicModalOpen: (value: boolean) => void;
}) => {
  const handleFABClick = () => {
    setMusicModalOpen(true);
  };
  const { paused, currentTrack } = useRoomMusic();

  return (
    <div className="relative flex justify-center items-center">
      <span
        className={`bg-indigo-400 h-16 w-16 absolute ${
          !paused && !musicModalOpen ? "" : "hidden"
        } animate-ping rounded-full`}
      />
      <div
        className={`absolute bottom-0 right-0 w-40 ${
          !paused && !musicModalOpen ? "flex" : "hidden"
        } justify-center items-center cursor-auto`}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: floatingMusicAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={300}
          width={300}
        />
      </div>

      <button
        className={`${
          musicModalOpen ? "hidden" : ""
        } z-10 relative overflow-hidden rounded-full bg-indigo-500 h-20 w-20 drop-shadow-2xl flex justify-center items-center p-2 text-4xl hover:scale-110 duration-300`}
        onClick={handleFABClick}
      >
        <span className="absolute h-full w-full bg-black/20 z-20" />
        <img
          src={currentTrack.thumbnail}
          alt="thumbnail"
          className="absolute h-full w-full"
        />

        {paused ? (
          <BsPlayCircle className="z-30 text-white" />
        ) : (
          <div className="w-full h-full z-30 flex justify-center items-center">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: waveAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={80}
              width={80}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default MusicFAB;
