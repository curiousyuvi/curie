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
import getUser from "../services/user";

const userContext = createContext<User>({
  currentUser: null,
  token: "",
  refreshToken: "",
});

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    currentUser: null,
    token: "",
    refreshToken: "",
  });
  useEffect(() => {
    getUser("696969").then((data) => {
      setUser(data);
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const useUserContext = () => useContext(userContext);

export default UserProvider;
export { useUserContext };
