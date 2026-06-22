import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // login → setState + save localStorage
  // reload → read localStorage → restore state
  // logout → clear both

  // وقتی App reload شد
  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    if (savedAuth) {
      setUser(savedAuth.user);
      setIsAuthenticated(savedAuth.isAuthenticated);
      setIsAdmin(savedAuth.isAdmin);
    }
  }, []);

  const login = (username, password) => {
    const isAdminUser = username === "admin" && password === "admin";

    const authData = {
      user: {
        username,
        role: isAdminUser ? "admin" : "customer",
      },
      isAuthenticated: true,
      isAdmin: isAdminUser,
    };

    setUser(authData.user);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);

    localStorage.setItem("auth", JSON.stringify(authData));
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    localStorage.removeItem("auth");
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
        {children}
      </UserInfoContext.Provider>
    </>
  );
}

export default AuthProvider;
