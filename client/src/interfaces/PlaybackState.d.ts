import { Player } from "./Player"
import { Track } from "./Track";

export type PlaybackState = {
    currentDevice: Player;
    currentTrack: Track;
    progress: number;
    timestamp; number;
    playing: boolean;
}