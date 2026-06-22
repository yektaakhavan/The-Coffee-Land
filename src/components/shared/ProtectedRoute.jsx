import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserInfoContext } from "../../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useContext(UserInfoContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (role && user?.role !== role) {
    // return <Navigate to="/unauthorized" />
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
