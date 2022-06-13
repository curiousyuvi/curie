import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/User";
import { getUser } from "../services/user";

const userContext = createContext<User | null>(null);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    getUser(token).then((data) => {
      setUser(data);
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const useUserContext = () => useContext(userContext);

export default UserProvider;
export { useUserContext };
