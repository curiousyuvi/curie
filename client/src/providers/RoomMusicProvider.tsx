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
    id: "",
    name: "",
    artists: [""],
    duration: 100000,
    thumbnail: "",
    uri: "",
  },
  setCurrentTrack: () => {},
  deviceId: "",
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
    id: "",
    name: "lorem ipsum",
    artists: ["lorem ipsum", "lorem ipsum"],
    duration: 0,
    thumbnail: placeHolderAvatar,
    uri: "",
  });
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    const timer = () => {
      setProgress(
        progress + (progress >= currentTrack.duration || paused ? 0 : 1000)
      );
    };

    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
