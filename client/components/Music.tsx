import { useState } from "react";
import MusicFAB from "./MusicFab";
import MusicModal from "./MusicModal";

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
    </>
  );
};

export default Music;
