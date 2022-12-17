import { useContext } from "react";
import { socketContext } from "../providers/socketProvider";

const useSocket = () => useContext(socketContext);

export default useSocket;
