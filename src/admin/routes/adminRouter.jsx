import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "../components/adminLayout";
import Cars from "../screens/modifyCars";
import Login from "../screens/login";
import ModifyBrands from "../screens/modifyBrands";
import RequestsScreen from "../screens/requests";
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
      <Route path="/admin/brands" element={<ProtectedRoute element={<AdminLayout><ModifyBrands /></AdminLayout>} />} />
      <Route path="/admin/requests" element={<ProtectedRoute element={<AdminLayout><RequestsScreen /></AdminLayout>} />} />
      <Route path="*" element={<Navigate to="/admin/cars" replace />} />
    </Routes>
  </AuthProvider>
);

export default AdminRouter;
