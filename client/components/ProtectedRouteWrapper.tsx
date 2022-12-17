import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRouteWrapper = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.replace("/identity");
  }, [currentUser]);

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
