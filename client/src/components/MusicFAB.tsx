import React from "react";
import { BsSoundwave } from "react-icons/bs";

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

  return (
    <button
      className={`${
        musicModalOpen ? "hidden" : ""
      } rounded-full bg-indigo-500 h-20 w-20 drop-shadow-2xl flex justify-center items-center p-2 text-4xl hover:scale-110 duration-300`}
      onClick={handleFABClick}
    >
      <BsSoundwave />
    </button>
  );
};

export default MusicFAB;
