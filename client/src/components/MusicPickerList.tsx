import React, { useEffect, useState } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import { Track } from "../interfaces/Track";
import MusicPickerListTile from "./MusicPickerListTile";

const MusicPickerList = ({ query }: { query: string }) => {
  const { searchTrack } = useMusic();
  const { token } = useAuth();
  const apiPrivateInstance = useApiPrivate();
  const [tracks, setTracks] = useState<Track[]>([]);

  const loadMusicList = async () => {
    setTracks(await searchTrack(query, token, apiPrivateInstance));
  };

  useEffect(() => {
    if (query !== "") loadMusicList();
    else setTracks([]);
  }, [query]);
  return (
    <div className="h-96 w-full overflow-y-auto">
      {tracks.length !== 0 ? (
        tracks.map((track) => (
          <MusicPickerListTile key={track.id} track={track} />
        ))
      ) : (
        <p className="h-full w-full flex justify-center items-center">
          {"🔎 "}Search and play {"🎧️ "}music
        </p>
      )}
    </div>
  );
};

export default MusicPickerList;
