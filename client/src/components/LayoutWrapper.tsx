import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../providers/AuthProvider";

const LayoutWrapper = () => {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/bg-static.jpg"
        className="w-auto h-full min-w-[100%] min-h-[100%] fixed z-[-10] object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <Toaster />
      <div className="w-full h-full flex justify-center items-center p-4 text-gray-300">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </>
  );
};

export default LayoutWrapper;
