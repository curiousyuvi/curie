import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
const socketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SERVER_URL || "http://localhost:5000"));
  }, []);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { socketContext };

export default SocketProvider;
