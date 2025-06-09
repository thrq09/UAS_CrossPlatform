import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]); // Simpan semua user

  const login = (username, password) => {
    const found = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) setUser(found);
    else alert("Invalid credentials");
  };

  const register = (username, password) => {
    const isUsed = registeredUsers.some((u) => u.username === username);
    if (isUsed) {
      alert("Username already used");
      return false;
    }

    setRegisteredUsers([...registeredUsers, { username, password }]);
    alert("Register successful. Please log in.");
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;