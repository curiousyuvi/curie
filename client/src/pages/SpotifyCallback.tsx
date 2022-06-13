import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { useUserContext } from "../providers/UserProvider";
import { getToken } from "../services/token";

export default function SpotifyCallback() {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setToken = () => {
    const code = searchParams.get("code");
    if (code) {
      console.log(`get token called with code = ${code}`);
      getToken(code).then((data) => {
        userContext.setToken(data!.token);
        userContext.setRefreshToken(data!.refresh_token);

        localStorage.setItem("token", data!.token);
        localStorage.setItem("refresh_token", data!.refresh_token);

        navigate("/chat/rooms");
      });
    }
  };
  useEffect(() => {
    if (userContext.token === "") setToken();
    else navigate("/chat/rooms");
  }, [userContext.token]);
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
