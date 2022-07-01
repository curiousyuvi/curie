import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import MusicPickerList from "./MusicPickerList";

const MusicPicker = () => {
  const [query, setQuery] = useState<string>("");
  const handleSearchInputChange = (event: any) => {
    setQuery(event.target.value);
  };
  return (
    <div className="w-full">
      <div className="p-4">
        <div className="w-full relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleSearchInputChange}
            placeholder="Search song name..."
            className="peer p-2 pr-10 bg-gray-300/10 outline-none border-none outline-2 focus:outline-4 outline-indigo-500/40 focus:outline-indigo-500 rounded-lg sm:text-lg w-full max-w-sm duration-200 text-gray-100"
          />
          <BiSearchAlt2 className="text-2xl absolute right-2 text-gray-400 peer-focus:text-white" />
        </div>
      </div>
      <div className="h-96 p-2 overflow-hidden">
        <MusicPickerList query={query} />
      </div>
    </div>
  );
};

export default MusicPicker;
