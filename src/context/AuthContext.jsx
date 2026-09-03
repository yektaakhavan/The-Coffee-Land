import React, { createContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

export const UserInfoContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    if (savedAuth?.user && savedAuth?.token) {
      setUser(savedAuth.user);
      setToken(savedAuth.token);
    }
  }, []);

  function persist(user, token) {
    setUser(user);
    setToken(token);
    localStorage.setItem("auth", JSON.stringify({ user, token }));
    window.dispatchEvent(new Event("auth-changed"));
  }

  // Calls the real backend, throws with a Persian error message on
  // failure (bad credentials, duplicate email, etc.) so callers can
  // show it directly on the form.
  const login = async (email, password) => {
    const result = await api.login({ email, password });
    persist(result.user, result.token);
    return result.user;
  };

  const register = async ({ fullName, email, password }) => {
    const result = await api.register({ fullName, email, password });
    persist(result.user, result.token);
    return result.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
    window.dispatchEvent(new Event("auth-changed"));
  };

  return (
    <UserInfoContext.Provider
      value={{ user, token, isAuthenticated, isAdmin, login, register, logout }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export default AuthProvider;
