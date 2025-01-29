import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./spinner/spinner";

export function ProtectedRoute({ isAuth, isChecked }: { isAuth: boolean; isChecked: boolean }) {
  if (!isChecked) {
    return <Spinner/>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/" replace/>;
}