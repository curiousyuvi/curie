import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useUserContext } from "../providers/UserProvider";

export default function Chat() {
  const userContext = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.token === "") navigate("/auth/login");
    else navigate("/chat/rooms");
  }, []);
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
