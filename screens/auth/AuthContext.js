import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null kalau belum login

  const login = () => {
    // Simulasi login
    const dummyUser = {
      name: "Adrianus Ezeekiel Dyarsa Amarta",
      role: "Employee",
      profilePic: "https://i.pravatar.cc/150?img=12", // avatar dummy
    };
    setUser(dummyUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
