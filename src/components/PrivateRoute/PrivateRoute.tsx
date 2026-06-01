import { Navigate } from "react-router-dom";
import { getToken } from "../../services/authService";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  if (!getToken()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
