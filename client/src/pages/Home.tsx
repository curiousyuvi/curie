import Music from "../components/Music";
import Room from "../components/Room";
import Rooms from "../components/Rooms";

export default function Home() {
  return (
    <div className="h-full w-full bg-red-300 flex justify-center items-center">
      <Rooms />
      <Room />
      <Music />
    </div>
  );
}
