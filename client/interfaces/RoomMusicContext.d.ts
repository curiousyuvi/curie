import { Track } from "./Track";

export type RoomMusicContext = {
  player: any | null;
  setPlayer: (player: any | null) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (progress: number) => void;
  currentTrack: Track;
  setCurrentTrack: (currentTrack: Track) => void;
};
