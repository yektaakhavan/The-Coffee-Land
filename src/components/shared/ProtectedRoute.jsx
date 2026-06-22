import React, { useContext } from "react";
import { UserInfoContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useContext(UserInfoContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
    // return <Navigate to="/unauthorized" />
  }
  return children;
}

export default ProtectedRoute;
