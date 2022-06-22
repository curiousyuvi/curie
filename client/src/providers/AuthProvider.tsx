import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import { AuthContext } from "../interfaces/AuthContext";
import { User } from "../interfaces/User";

const authContext = createContext<AuthContext>({
  user: null,
  token: "",
  loadUser: async () => {},
  logout: () => {},
  setToken: (token) => {
    return token;
  },
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getUID, getUser } = useUser();
  const { refreshToken, clearRefreshToken } = useToken();
  const apiPrivate = useApiPrivate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const loadTokenFromRefresh = async () => {
    const data = await refreshToken();
    if (data) setToken(data);
  };

  const loadUser = async () => {
    if (token !== "") {
      const uiddata = await getUID(token, apiPrivate);
      if (uiddata) {
        await localStorage.setItem("UID", uiddata);
        const data = await getUser(uiddata);
        if (data) setUser(data);
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken("");
    clearRefreshToken();
  };

  useEffect(() => {
    const initUser = async () => {
      if (localStorage.getItem("UID")) await loadTokenFromRefresh();
    };

    initUser();
  }, []);

  useEffect(() => {
    loadUser();
  }, [token]);

  return (
    <authContext.Provider value={{ user, token, loadUser, logout, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export { authContext };
