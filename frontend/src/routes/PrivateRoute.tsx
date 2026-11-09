import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
}