import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserInfoContext } from "../../context/AuthContext";

function GuestRoute({ children }) {
  const { isAuthenticated, isAdmin } = useContext(UserInfoContext);

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} />;
  }

  return children;
}

export default GuestRoute;
