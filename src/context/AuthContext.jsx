import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    if (savedAuth?.user) {
      setUser(savedAuth.user);
    }
  }, []);

  const login = (user) => {
    setUser(user);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
      }),
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <UserInfoContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export default AuthProvider;
