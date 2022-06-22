import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function CreateUser() {
  const { createUser } = useUser();
  const { loadUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("UID");
    if (uid)
      createUser({
        uid,
        name: "Yuvraj",
        status: "cool",
        rooms: [],
        avatar_url: "someurl",
        username: "curiousyuvi",
      }).then((result) => {
        if (result) {
          loadUser();
        }
      });
  }, []);
  return <div>CreateUser</div>;
}
