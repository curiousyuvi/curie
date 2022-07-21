import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import useSocket from "../hooks/useSocket";
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
  deviceId: "",
  setDeviceId: () => {},
});

const RoomMusicProvider = ({ children }: { children: ReactNode }) => {
  const getPlceholderAvatar = usePlaceholderAvatar();
  const placeHolderAvatar = getPlceholderAvatar();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [paused, setPaused] = useState<boolean>(true);
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
  const params = useParams();

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
    if (rid === params.rid) {
      if (play) {
        music.play(token, privateAPI);
      } else {
        music.pause(token, privateAPI);
      }
    }
  };

  const handleReceivePlayTrackSocket = ({
    uid,
    rid,
    track,
  }: {
    uid: string;
    rid: string;
    track: Track;
  }) => {
    if (rid === params.rid) {
      music.play(token, privateAPI, undefined, track.uri);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_play_pause", handleReceivePlayPauseSocket);
      socket.on("receive_play_track", handleReceivePlayTrackSocket);
    }

    return () => {
      socket?.off("receive_play_pause", handleReceivePlayPauseSocket);
      socket?.off("receive_play_track", handleReceivePlayTrackSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, token, params]);

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
