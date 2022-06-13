import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

export default function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (token !== "") navigate("/chat/rooms");
  }, []);

  return (
    <div className="w-96 bg-indigo-700/50 p-8 rounded-lg flex flex-col items-center">
      <img
        src={require("../assets/logo.png")}
        alt="curie-logo"
        className="w-44 mb-4"
      />
      <img
        src={require("../assets/heading.png")}
        alt="CURIE"
        className="w-32 mb-8"
      />
      <p className="text-xl mb-4">{"🤗 "}Welcome to Curie</p>
      <a
        href={process.env.REACT_APP_API_ENDPOINT + "/api/auth/login"}
        className="w-full"
      >
        <PrimaryButton onClick={() => {}}>LOG IN WITH SPOTIFY</PrimaryButton>
      </a>
    </div>
  );
}
