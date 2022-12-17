import React from "react";
import Lottie from "react-lottie";
import chatLoader from "../public/assets/chat_loader_lottie.json";

const ChatLoading = () => {
  return (
    <div className="h-full bg-blue-900/70 w-full flex justify-center items-center">
      <span className="opacity-70">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: chatLoader,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={150}
          width={150}
        />
      </span>
    </div>
  );
};

export default ChatLoading;
