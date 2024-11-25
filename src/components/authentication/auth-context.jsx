import React, { createContext, useState, useEffect } from "react";
import { getData, urls } from "../../lib/utils";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    return storedStatus === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = async () => {
    const url = process.env.REACT_APP_API_URL + urls.logout;
    await getData(url);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
