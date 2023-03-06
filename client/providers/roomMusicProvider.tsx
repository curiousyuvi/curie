import { useRouter } from "next/router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
// import useSocket from "../hooks/useSocket";
import { RoomMusicContext } from "../interfaces/RoomMusicContext";
import { Track } from "../interfaces/Track";
const roomMusicContext = createContext<RoomMusicContext>({
  player: null,
  setPlayer: () => {},
  paused: true,
  setPaused: () => {},
  progress: 0,
  setProgress: () => {},
  currentTrack: {
    id: "",
    name: "",
    channel: "",
    thumbnail: "",
  },
  setCurrentTrack: () => {},
  duration: 0,
  setDuration: () => {},
  playpause: () => {},
  changeTrack: () => {},
});

const RoomMusicProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<any | null>(null);
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: "TMSIR210mRg",
    name: "Love Yourself - Justin Bieber",
    channel: "JustinBieberVevo",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png",
  });
  // const { socket } = useSocket();
  // const router = useRouter();

  const playpause = (play: boolean) => {
    if (play) player?.playVideo();
    else player?.pauseVideo();

    const handleProgressSync = () => {
      setProgress(player?.getCurrentTime());
    };

    setTimeout(handleProgressSync, 1000);
  };

  const changeTrack = (
    newTrack: Track,
    newProgress?: number,
    pause?: boolean
  ) => {
    setCurrentTrack(newTrack);
    if (newProgress) {
      player?.seekTo(newProgress, true);
      setProgress(newProgress);
    }
    const handleInitialPlay = () => {
      if (!pause) {
        player?.playVideo();
      }
    };

    setTimeout(handleInitialPlay, 1000);
  };

  useEffect(() => {
    if (player) {
      const handleRefreshDuration = () => {
        setDuration(player?.getDuration());
      };

      setTimeout(handleRefreshDuration, 1000);
    }
  }, [currentTrack, player]);

  useEffect(() => {
    const timer = () => {
      setProgress(progress + (progress >= duration || paused ? 0 : 1));
    };

    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, paused]);

  // TODO: Implement synced player
  // const handleReceivePlayPauseSocket = ({
  //   uid,
  //   rid,
  //   play,
  // }: {
  //   uid: string;
  //   rid: string;
  //   play: boolean;
  // }) => {
  //   if (rid === router.query.rid) {
  //     if (play) {
  //       music.play();
  //     } else {
  //       music.pause();
  //     }
  //   }
  // };

  // const handleReceivePlayTrackSocket = ({
  //   uid,
  //   rid,
  //   track,
  // }: {
  //   uid: string;
  //   rid: string;
  //   track: Track;
  // }) => {
  //   if (rid === router.query.rid) {
  //     music.play(undefined, track.uri);
  //   }
  // };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive_play_pause", handleReceivePlayPauseSocket);
  //     socket.on("receive_play_track", handleReceivePlayTrackSocket);
  //   }

  //   return () => {
  //     socket?.off("receive_play_pause", handleReceivePlayPauseSocket);
  //     socket?.off("receive_play_track", handleReceivePlayTrackSocket);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket, router]);

  return (
    <roomMusicContext.Provider
      value={{
        player,
        setPlayer,
        paused,
        setPaused,
        progress,
        setProgress,
        currentTrack,
        setCurrentTrack,
        duration,
        setDuration,
        playpause,
        changeTrack,
      }}
    >
      {children}
    </roomMusicContext.Provider>
  );
};

export default RoomMusicProvider;

export { roomMusicContext };
