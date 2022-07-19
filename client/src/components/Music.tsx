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
      <div className="absolute sm:bottom-28 sm:right-10 bottom-24 right-4">
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
