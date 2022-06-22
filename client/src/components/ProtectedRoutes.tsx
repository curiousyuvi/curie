import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const auth = useAuth();
  if (auth.user) return <Outlet />;
  else return <Navigate to="/login" replace />;
};

const NoAuth = () => {
  const auth = useAuth();
  if (!auth.user) return <Outlet />;
  else return <Navigate to="/" replace />;
};

const ProtectedRoutes = { Auth, NoAuth };

export default ProtectedRoutes;
