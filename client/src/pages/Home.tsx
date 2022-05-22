import Room from "../components/Room";
import Rooms from "../components/Rooms";

export default function Home() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Rooms />
      <Room />
    </div>
  );
}
