import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import WindowHeader from "./WindowHeader";

type WindowWrapperProps = { children: ReactNode };

const WindowWrapper: FC<WindowWrapperProps> = ({ children }) => {
  return (
    <div className="w-full max-w-6xl h-full rounded-none sm:rounded-2xl overflow-hidden">
      <WindowHeader />
      <div className="w-full h-full bg-indigo-600/50 flex flex-col-reverse justify-end sm:flex-row sm:justify-start">
        <Navbar />
        <div className="w-full h-full max-h-[calc(100vh-7.5rem)] sm:max-h-max">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WindowWrapper;
