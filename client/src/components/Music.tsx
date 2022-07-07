import MusicFAB from "./MusicFAB";
import MusicModal from "./MusicModal";

const Music = ({
  musicModalOpen,
  setMusicModalOpen,
}: {
  musicModalOpen: boolean;
  setMusicModalOpen: (value: boolean) => void;
}) => {
  return (
    <>
      <div className="absolute bottom-28 right-10">
        <MusicFAB
          musicModalOpen={musicModalOpen}
          setMusicModalOpen={setMusicModalOpen}
        />
      </div>
      <MusicModal
        musicModalOpen={musicModalOpen}
        setMusicModalOpen={setMusicModalOpen}
      />
    </>
  );
};

export default Music;
