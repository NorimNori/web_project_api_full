import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children, isLoggedIn }) {
  const { isLoading } = useContext(CurrentUserContext);

  if (isLoading) return null;

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}
