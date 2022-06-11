import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

export default function Home() {
  const userContext = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.token === "") navigate("/auth/login");
    else navigate("/chat/rooms");
  }, []);
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
