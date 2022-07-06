import React, { createContext, ReactNode, useEffect, useState } from "react";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import { RoomMusicContext } from "../interfaces/RoomMusicContext";
import { Track } from "../interfaces/Track";
const roomMusicContext = createContext<RoomMusicContext>({
  player: null,
  setPlayer: () => {},
  paused: false,
  setPaused: () => {},
  active: false,
  setActive: () => {},
  progress: 0,
  setProgress: () => {},
  currentTrack: {
    id: "curietrackid",
    name: "curietrackname",
    artists: ["tractartists"],
    duration: 100000,
    thumbnail: "curiethumbnail",
    uri: "curietrackuri",
  },
  setCurrentTrack: () => {},
  deviceId: "curiedeviceid",
  setDeviceId: () => {},
});

const RoomMusicProvider = ({ children }: { children: ReactNode }) => {
  const getPlceholderAvatar = usePlaceholderAvatar();
  const placeHolderAvatar = getPlceholderAvatar();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: "curietrackid",
    name: "curiet rackn amesd gfaga egwar",
    artists: ["tractartists", "tractartists", "tractartists", "tractartists"],
    duration: 60000,
    thumbnail: placeHolderAvatar,
    uri: "curietrackuri",
  });
  const [deviceId, setDeviceId] = useState("curiedeviceid");

  useEffect(() => {
    const timer = () => {
      setProgress(
        progress + (progress >= currentTrack.duration || paused ? 0 : 1000)
      );
    };

    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [progress, paused]);

  return (
    <roomMusicContext.Provider
      value={{
        player,
        setPlayer,
        paused,
        setPaused,
        active,
        setActive,
        progress,
        setProgress,
        currentTrack,
        setCurrentTrack,
        deviceId,
        setDeviceId,
      }}
    >
      {children}
    </roomMusicContext.Provider>
  );
};

export default RoomMusicProvider;

export { roomMusicContext };
