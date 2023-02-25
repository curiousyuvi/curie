import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Track } from "../interfaces/Track";
import searchAnimation from "../public/assets/search_lottie.json";
import MusicPickerListTile from "./MusicPickerListTile";
import axios from "axios";
import { searchMusicAPI } from "../services/apiServices";
import useSearchMusic from "../hooks/useSearchMusic";

const MusicPickerList = ({ query }: { query: string }) => {
  const searchMusicQuery = useSearchMusic(query);

  return (
    <div className="h-[22rem] sm:h-[35rem] w-full overflow-y-auto pb-[8rem]">
      {!searchMusicQuery.error ? (
        searchMusicQuery.isLoading ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: searchAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={350}
              width={300}
            />
          </div>
        ) : (
          searchMusicQuery?.data &&
          searchMusicQuery?.data?.data?.tracks.map((track: Track) => (
            <MusicPickerListTile key={track.id} track={track} />
          ))
        )
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: searchAnimation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={350}
            width={300}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPickerList;
