import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/adminLayout";
import Cars from "../screens/modifyCars";
import Login from "../screens/login";

const AdminRouter = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return isAuthenticated ? (
    <AdminLayout>
      <Routes>
        <Route path="/admin/cars" element={<Cars />} />
        <Route path="*" element={<Navigate to="/admin/cars" replace />} />
      </Routes>
    </AdminLayout>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AdminRouter;
