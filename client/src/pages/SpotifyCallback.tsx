import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loader from "../assets/bounce_loader_lottie_w.json";
import useToken from "../hooks/useToken";

export default function SpotifyCallback() {
  const { getToken } = useToken();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const { setToken, token } = useAuth();

  useEffect(() => {
    const loadUserAndNavigateToCreate = () => {
      if (token !== "")
        if (localStorage.getItem("UID"))
          navigate("/create_user", { replace: true });
    };
    loadUserAndNavigateToCreate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const loadToken = async () => {
      const code = searchParams.get("code");
      if (code) setToken((await getToken(code)) || "");
    };
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={300}
      width={300}
    />
  );
}
