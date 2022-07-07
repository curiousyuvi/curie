import { Track } from "./Track";

export type RoomMusicContext = {
    player: Spotify.Player | null;
    setPlayer: (player: Spotify.Player | null) => void;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    active: boolean;
    setActive: (active: boolean) => void;
    progress: number;
    setProgress: (progress: number) => void;
    currentTrack: Track;
    setCurrentTrack: (currentTrack: Track) => void;
    deviceId: string;
    setDeviceId: (deviceId: string) => void;
}