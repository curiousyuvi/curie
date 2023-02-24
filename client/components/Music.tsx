import { useState } from "react";
import MusicFAB from "./MusicFab";
import MusicModal from "./MusicModal";
import YoutubeEmbedPlayer from "./YoutubeEmbedPlayer";

const Music = () => {
  const [musicModalOpen, setMusicModalOpen] = useState<boolean>(false);

  return (
    <>
      <MusicFAB
        musicModalOpen={musicModalOpen}
        setMusicModalOpen={setMusicModalOpen}
      />
      <MusicModal
        musicModalOpen={musicModalOpen}
        setMusicModalOpen={setMusicModalOpen}
      />
      <YoutubeEmbedPlayer />
    </>
  );
};

export default Music;
