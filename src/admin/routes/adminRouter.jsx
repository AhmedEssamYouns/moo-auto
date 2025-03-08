import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/adminLayout";
import Cars from "../screens/modifyCars";


const AdminRouter = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin/cars" element={<Cars />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRouter;
