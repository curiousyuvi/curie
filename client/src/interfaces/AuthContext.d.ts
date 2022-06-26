import { User } from "./User";

export type AuthContext = {
  user: User | null;
  token: string;
  logout: () => void;
  loadUser: () => Promise<void>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
