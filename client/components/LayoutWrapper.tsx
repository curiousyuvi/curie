import React, { FC, ReactNode } from "react";
import WindowWrapper from "./WindowWrapper";

type LayoutWrapperProps = { children: ReactNode };
const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center p-0 sm:p-8">
      <video
        autoPlay
        loop
        playsInline
        poster="/assets/bg-static.jpg"
        className="w-auto h-full min-w-[100%] min-h-[100%] fixed z-[-10] object-cover"
      >
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <WindowWrapper>{children}</WindowWrapper>
    </div>
  );
};

export default LayoutWrapper;
