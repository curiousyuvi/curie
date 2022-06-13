import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUser } from "../models/CurrentUser";
import { User } from "../models/User";
import { getCurrentUser } from "../services/user";

const userContext = createContext<User>({
  currentUser: null,
  token: "",
  refreshToken: "",
  setToken: () => {},
  setRefreshToken: () => {},
});

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const setToken = (token: string) => {
    setUser({ ...user, token });
  };

  const setRefreshToken = (token: string) => {
    setUser({ ...user, token });
  };
  const [user, setUser] = useState<User>({
    currentUser: null,
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refresh_token") || "",
    setToken,
    setRefreshToken,
  });
  useEffect(() => {
    getCurrentUser(user.token).then((data) => {
      setUser({ ...user, currentUser: data });
    });
  }, [user.token]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const useUserContext = () => useContext(userContext);

export default UserProvider;
export { useUserContext };
