import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/home";
import ProductsScreen from "../screens/products";
import NotFound from "../screens/404";
import ProductScreen from "../screens/productDetails";
import RequestCarScreen from "../screens/requestCar";
import InstallmentServicesScreen from "../screens/finance";
import AboutUsScreen from "../screens/about";
import BestSelling from "../components/products";
import CarsListScreen from "../screens/searchList";
import AdminPanel from "../admin/routes/adminRouter";

// Dummy Page
const Offers = () => <h2>Offers & Discounts</h2>;

const AppRoutes = ({ darkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen darkMode={darkMode} />} />
      <Route path="/cars-for-sale" element={<ProductsScreen darkMode={darkMode} />} />
      <Route path="/new-arrivals" element={<BestSelling darkMode={darkMode} />} />
      {/* <Route path="/offers" element={<Offers />} /> */}
      <Route path="/product/:id" element={<ProductScreen darkMode={darkMode} />} />
      <Route path="/request-car" element={<RequestCarScreen darkMode={darkMode} />} />
      <Route path="/cars-list" element={<CarsListScreen darkMode={darkMode} />} />
      <Route path="/financing" element={<InstallmentServicesScreen darkMode={darkMode} />} />
      {/* <Route path="/about-us" element={<AboutUsScreen darkMode={darkMode} />} /> */}
      <Route path="*" element={<NotFound darkMode={darkMode} />} />
    </Routes>
  );
};

export default AppRoutes;
