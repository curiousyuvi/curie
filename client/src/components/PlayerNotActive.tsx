import React from "react";
import useAuth from "../hooks/useAuth";

const PlayerNotActive = () => {
  const { user } = useAuth();

  return (
    <div className="absolute h-full w-full bg-black/40 backdrop-blur p-2 flex flex-col  justify-center items-center rounded-lg rounded-t-none">
      <p className="font-medium text-white">{"😵 "}Player not Active</p>
      <p className="text-sm text-center">
        Activate by switching to{" "}
        <span className="text-white font-medium">{`"${user?.name}'s Curie Player"`}</span>{" "}
        in Spotify Connect.
      </p>
    </div>
  );
};

export default PlayerNotActive;
