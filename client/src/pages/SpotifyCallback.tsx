import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { getToken } from "../services/token";

export default function SpotifyCallback() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("token") || "";

  const setToken = () => {
    const code = searchParams.get("code");
    if (code) {
      getToken(code).then((data) => {
        localStorage.setItem("token", data!.token);
        localStorage.setItem("refresh_token", data!.refresh_token);

        navigate("/chat/rooms");
      });
    }
  };
  useEffect(() => {
    if (token === "") setToken();
    else navigate("/chat/rooms");
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
      <div>
        <PrimaryButton onClick={() => {}}>LOGGING IN...</PrimaryButton>
      </div>
    </div>
  );
}
