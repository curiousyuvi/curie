import Lottie from "react-lottie";
import boyListeningMusicAnimation from "../public/assets/boy_listening_music.json";

export default function NoRoom() {
  return (
    <div className="p-4 w-full h-full flex-col justify-center items-center bg-blue-900/70 hidden md:flex">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: boyListeningMusicAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={300}
      />
      <span className="h-4" />
      <p className="text-xl">
        Vibe on {"  🎧️ "}music and {"  💬 "}chat with you gang in Chat Rooms
      </p>
      <span className="h-4" />
      <p>{"👈️ "}Open a Room from the left</p>
    </div>
  );
}
