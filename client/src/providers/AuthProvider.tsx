import React, {
  createContext,
  FC,
  ReactNode,
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
  authLoading: false,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getUID, getUser } = useUser();
  const { refreshToken, clearRefreshToken } = useToken();
  const apiPrivate = useApiPrivate();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const loadTokenFromRefresh = async () => {
    setAuthLoading(true);
    const data = await refreshToken();
    setAuthLoading(false);
    if (data) setToken(data);
  };

  const loadUser = async () => {
    if (token !== "") {
      setAuthLoading(true);
      const uiddata = await getUID(token, apiPrivate);
      if (uiddata) {
        await localStorage.setItem("UID", uiddata);
        const data = await getUser(uiddata);
        if (data) setUser(data);
      }
      setAuthLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <authContext.Provider
      value={{ user, token, loadUser, logout, setToken, authLoading }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export { authContext };
