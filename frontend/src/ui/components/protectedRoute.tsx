import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isAuth }: { isAuth: boolean }) {
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
