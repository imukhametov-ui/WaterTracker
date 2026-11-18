import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Outlet />
  );
}