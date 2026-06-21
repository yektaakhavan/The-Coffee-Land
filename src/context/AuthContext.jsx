import React, { createContext, useState } from "react";
import SignInPage from "../pages/auth/SignInPage";

export const UserInfoContext = createContext();

function AuthProvider() {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setUser({ username: "admin", role: "admin" });
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else {
      setUser({ username, role: "Customer" });
      setIsAuthenticated(true);
      setIsAdmin(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const AuthPackage = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };

  
  return (
    <>
      <UserInfoContext.Provider value={AuthPackage}>
        <App />
      </UserInfoContext.Provider>
    </>
  );
}

export default AuthProvider;
