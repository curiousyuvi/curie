import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

export default function ChatWrapper() {
  return (
    <div className="flex flex-col w-full h-full max-w-6xl">
      <Header />
      <div className="w-full h-full flex ">
        <Navbar />
        <div className="h-full w-full rounded-br-lg overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
