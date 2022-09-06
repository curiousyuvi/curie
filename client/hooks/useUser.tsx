import { useContext } from "react";
import { userContext } from "../providers/UserProvider";

const useUser = () => useContext(userContext);

export default useUser;
