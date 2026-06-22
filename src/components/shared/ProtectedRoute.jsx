import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserInfoContext } from "../../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated } = useContext(UserInfoContext);
  const location = useLocation();

  // 1) اگر لاگین نیست → برو لاگین
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // 2) اگر role خواسته شده و کاربر آن role را ندارد
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // 3) دسترسی OK
  return children;
}

export default ProtectedRoute;
