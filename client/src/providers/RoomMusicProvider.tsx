import React, { createContext, ReactNode, useEffect, useState } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import useSocket from "../hooks/useSocket";
import { Device } from "../interfaces/Device";
import { RoomMusicContext } from "../interfaces/RoomMusicContext";
import { Track } from "../interfaces/Track";
const roomMusicContext = createContext<RoomMusicContext>({
  player: null,
  setPlayer: () => {},
  paused: true,
  setPaused: () => {},
  active: false,
  setActive: () => {},
  progress: 0,
  setProgress: () => {},
  currentTrack: {
    id: "",
    name: "",
    artists: [""],
    duration: 0,
    thumbnail: "",
    uri: "",
  },
  setCurrentTrack: () => {},
  device: null,
  setDevice: () => {},
  deviceId: "",
  setDeviceId: () => {},
});

const RoomMusicProvider = ({ children }: { children: ReactNode }) => {
  const getPlceholderAvatar = usePlaceholderAvatar();
  const placeHolderAvatar = getPlceholderAvatar();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [paused, setPaused] = useState<boolean>(true);
  const [device, setDevice] = useState<Device | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const privateAPI = useApiPrivate();
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: "",
    name: "lorem ipsum",
    artists: ["lorem ipsum", "lorem ipsum"],
    duration: 0,
    thumbnail: placeHolderAvatar,
    uri: "",
  });
  const { socket } = useSocket();
  const { token } = useAuth();
  const music = useMusic();

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

  const handleReceivePlayPauseSocket = ({
    uid,
    rid,
    play,
  }: {
    uid: string;
    rid: string;
    play: boolean;
  }) => {
    if (play) {
      music.play(token, privateAPI);
    } else {
      music.pause(token, privateAPI);
    }
  };

  const handleReceiveNextSocket = ({
    uid,
    rid,
  }: {
    uid: string;
    rid: string;
  }) => {
    music.next(token, privateAPI);
  };

  const handleReceivePreviousSocket = ({
    uid,
    rid,
  }: {
    uid: string;
    rid: string;
  }) => {
    music.previous(token, privateAPI);
  };

  const handleReceivePlayTrackSocket = ({
    uid,
    rid,
    trackUri,
  }: {
    uid: string;
    rid: string;
    trackUri: string;
  }) => {
    music.play(token, privateAPI, trackUri);
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_play_pause", handleReceivePlayPauseSocket);
      socket.on("receive_next", handleReceiveNextSocket);
      socket.on("receive_previous", handleReceivePreviousSocket);
      socket.on("receive_play_track", handleReceivePlayTrackSocket);
    }

    return () => {
      socket?.off("receive_play_pause", handleReceivePlayPauseSocket);
      socket?.off("receive_next", handleReceiveNextSocket);
      socket?.off("receive_previous", handleReceivePreviousSocket);
      socket?.off("receive_play_track", handleReceivePlayTrackSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, token]);

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
        device,
        setDevice,
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
