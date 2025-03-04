import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/home";

// Dummy Pages
const CarsForSale = () => <h2>Cars for Sale</h2>;
const NewArrivals = () => <h2>New Arrivals</h2>;
const Offers = () => <h2>Offers & Discounts</h2>;
const RequestCar = () => <h2>Request a Car</h2>;
const Financing = () => <h2>Financing</h2>;
const AboutUs = () => <h2>About Us</h2>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/cars-for-sale" element={<CarsForSale />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/request-car" element={<RequestCar />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<CarsForSale />} />
    </Routes>
  );
};

export default AppRoutes;
