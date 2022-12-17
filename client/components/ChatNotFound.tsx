import React from "react";
import Lottie from "react-lottie";
import notFound from "../public/assets/not-found-lottie.json";

const ChatNotFound = () => {
  return (
    <div className="h-full bg-blue-900/70 w-full flex flex-col justify-center items-center gap-4">
      <span className="opacity-70">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: notFound,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={300}
          width={500}
        />
      </span>
      <h1 className="text-xl">{"😥"}Room Not Found</h1>
    </div>
  );
};

export default ChatNotFound;
