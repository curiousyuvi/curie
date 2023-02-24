import { useContext } from "react";
import { roomMusicContext } from "../providers/roomMusicProvider";

const useRoomMusic = () => useContext(roomMusicContext);

export default useRoomMusic;
