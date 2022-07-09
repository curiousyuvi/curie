import { useContext } from "react";
import { socketContext } from "../providers/SocketProvider";

const useSocket = () => useContext(socketContext);

export default useSocket;
