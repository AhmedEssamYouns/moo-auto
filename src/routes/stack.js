import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/home";
import ProductsScreen from "../screens/products";
import NotFound from "../screens/404";
import ProductScreen from "../screens/productDetails";
import RequestCarScreen from "../screens/requestCar";
import InstallmentServicesScreen from "../screens/finance";
import AboutUsScreen from "../screens/about";
// Dummy Pages
const NewArrivals = () => <h2>New Arrivals</h2>;
const Offers = () => <h2>Offers & Discounts</h2>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/cars-for-sale" element={<ProductsScreen />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/request-car" element={<RequestCarScreen />} />
      <Route path="/financing" element={<InstallmentServicesScreen />} />
      <Route path="/about-us" element={<AboutUsScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
