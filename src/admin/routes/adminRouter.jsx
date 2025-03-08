import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "../components/adminLayout";
import Cars from "../screens/modifyCars";
import Login from "../screens/login";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/admin/cars", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AdminRouter = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/cars" element={<ProtectedRoute element={<AdminLayout><Cars /></AdminLayout>} />} />
      <Route path="*" element={<Navigate to="/admin/cars" replace />} />
    </Routes>
  </AuthProvider>
);

export default AdminRouter;
