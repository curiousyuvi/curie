import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { useUserContext } from "../providers/UserProvider";

export default function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();

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
      <p className="text-lg mb-4">{"🤗 "}Welcome to Curie</p>
      <PrimaryButton onClick={() => {}} text="LOG IN WITH SPOTIFY" />
    </div>
  );
}
