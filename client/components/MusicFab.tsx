import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import Lottie from "react-lottie";
import waveAnimation from "../public/assets/wave_lottie.json";
import floatingMusicAnimation from "../public/assets/floating_music_lottie.json";
import useRoomMusic from "../hooks/useRoomMusic";

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
    <div className="absolute sm:bottom-36 sm:right-10 bottom-24 right-4">
      <div className="relative flex justify-center items-center">
        <span
          className={`bg-indigo-400 sm:h-16 sm:w-16 h-12 w-12 absolute ${
            !paused && !musicModalOpen ? "" : "hidden"
          } animate-ping rounded-full`}
        />
        <div
          className={`absolute bottom-0 right-0 sm:w-40 w-32 ${
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
          } z-10 relative overflow-hidden rounded-full bg-indigo-500 sm:h-20 sm:w-20 w-16 h-16 drop-shadow-2xl flex justify-center items-center p-2 text-4xl hover:scale-110 duration-300`}
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
                height={60}
                width={60}
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicFAB;
