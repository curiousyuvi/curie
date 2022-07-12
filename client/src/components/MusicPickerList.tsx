import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import { Track } from "../interfaces/Track";
import MusicPickerListTile from "./MusicPickerListTile";
import searchAnimation from "../assets/search_lottie.json";

const MusicPickerList = ({ query }: { query: string }) => {
  const { searchMusic } = useMusic();
  const { token } = useAuth();
  const apiPrivateInstance = useApiPrivate();
  const [tracks, setTracks] = useState<Track[]>([]);

  const loadMusicList = async () => {
    setTracks(await searchMusic(query, token, apiPrivateInstance));
  };

  useEffect(() => {
    if (query !== "") loadMusicList();
    else setTracks([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <div className="h-[35rem] w-full overflow-y-auto pb-[8rem]">
      {tracks.length !== 0 ? (
        tracks.map((track) => (
          <MusicPickerListTile key={track.id} track={track} />
        ))
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
            width={350}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPickerList;
