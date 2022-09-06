import React, { createContext, FC, ReactNode, useState } from "react";
import { User } from "../interfaces/User";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const userContext = createContext<UserContextType>({
  user: {} as User,
  setUser: () => {},
});

export type UserProviderProps = { children: ReactNode };

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext };
export default UserProvider;
