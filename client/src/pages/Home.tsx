import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (token === "") navigate("/auth/login");
    else navigate("/chat/rooms");
  }, []);
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
