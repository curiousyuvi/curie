import { useRouter } from "next/router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { RoomMusicContext } from "../interfaces/RoomMusicContext";
import { Track } from "../interfaces/Track";
import { getLastTrackAPI, updateLastTrackAPI } from "../services/apiServices";
import { getUnixEpochTime } from "../helpers/epoch";
import { User } from "../interfaces/User";
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
  voting: false,
  setVoting: () => {},
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
  const [voting, setVoting] = useState<boolean>(false);
  const router = useRouter();

  const playpause = (play: boolean) => {
    if (play) {
      player?.playVideo();
    } else player?.pauseVideo();

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

    const handleInitialPlay = () => {
      if (pause) {
        playpause(false);
      } else {
        playpause(true);
      }
      if (newProgress) {
        player?.seekTo(newProgress, true);
        setProgress(newProgress);
        if (newProgress >= player?.getDuration()) playpause(false);
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

  useEffect(() => {
    const fetchLastTrack = async () => {
      try {
        const response = await getLastTrackAPI(router?.query?.rid);

        if (response?.data?.last_track_playing) {
          const currentTimestamp = getUnixEpochTime();
          if (response?.data?.last_track_timestamp !== 0) {
            const secondsElapsed =
              currentTimestamp - response?.data?.last_track_timestamp;
            changeTrack(
              {
                id: response?.data?.last_track_id,
                thumbnail: response?.data?.last_track_thumbnail,
                name: response?.data?.last_track_name,
                channel: response?.data?.last_track_channel,
              },
              response?.data?.last_track_progress + secondsElapsed
            );
          }
        } else {
          changeTrack(
            {
              id: response?.data?.last_track_id,
              thumbnail: response?.data?.last_track_thumbnail,
              name: response?.data?.last_track_name,
              channel: response?.data?.last_track_channel,
            },
            response?.data?.last_track_progress,
            true
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchLastTrack();
  }, [router?.query?.rid, player]);

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
        voting,
        setVoting,
      }}
    >
      {children}
    </roomMusicContext.Provider>
  );
};

export default RoomMusicProvider;

export { roomMusicContext };
