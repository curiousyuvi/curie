import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

export default function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    //TODO: remove this mock code
    userContext.token = "something";
    navigate("/chat/rooms");
  }, []);
  return <div>Login</div>;
}
