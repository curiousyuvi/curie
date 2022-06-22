import { useContext } from "react";
import { authContext } from "../providers/AuthProvider";

const useAuth = () => useContext(authContext);

export default useAuth;
