import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineNextPlan } from "react-icons/md";

import { Track } from "../interfaces/Track";

const MusicPickerListTile = ({ track }: { track: Track }) => {
  return (
    <div className="w-full h-20 my-1 p-1 border border-indigo-300/30 border-x-0 border-t-0 flex items-center justify-start overflow-hidden">
      <div className="group h-full w-[6rem] rounded overflow-hidden flex items-center relative">
        <img src={track.thumbnail} alt="thumbnail" className="w-full h-full" />
        <div className="absolute opacity-0 group-hover:opacity-100 duration-300 z-40 h-full w-full bg-black/50 flex justify-around items-center text-white">
          <button>
            <IoPlayCircleOutline className="text-3xl" />
          </button>
          <button>
            <MdOutlineNextPlan className="text-3xl" />
          </button>
        </div>
      </div>
      <span className="mx-2" />
      <div className="w-full flex flex-col items-start justify-between">
        <p className="text-gray-200 overflow-hidden text-ellipsis font-medium w-full h-6">
          {track.name}
        </p>
        <span className="my-1" />
        <p className="text-sm overflow-hidden text-ellipsis w-full h-4">
          {track.artists.map((artist, i) => {
            return (
              <span key={i} className="mr-2">
                {artist}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default MusicPickerListTile;
