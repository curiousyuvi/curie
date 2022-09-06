import React, { createContext, FC, ReactNode, useState } from "react";
import { User } from "../interfaces/User";

const userContext = createContext<User>({ name: "", imageUrl: "" });

export type UserProviderProps = { children: ReactNode };

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <userContext.Provider value={{ name, imageUrl }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext };
export default UserProvider;
