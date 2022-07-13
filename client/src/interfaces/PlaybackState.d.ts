import { Device } from "./Device"
import { Track } from "./Track";

export type PlaybackState = {
    currentDevice: Device;
    currentTrack: Track;
    progress: number;
    timestamp; number;
    playing: boolean;
}