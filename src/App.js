import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import HomeScreen from "./screens/home";

// Custom Theme with Multiple Fonts
const theme = createTheme({
  typography: {
    fontFamily: "'Ubuntu', sans-serif",
    h1: { fontFamily: "'Permanent Marker', cursive" },
    h2: { fontFamily: "'Permanent Marker', cursive" },
    h3: { fontFamily: "'Permanent Marker', cursive" },
  },
});

// Dummy Pages
const CarsForSale = () => <h2>Cars for Sale</h2>;
const NewArrivals = () => <h2>New Arrivals</h2>;
const Offers = () => <h2>Offers & Discounts</h2>;
const RequestCar = () => <h2>Request a Car</h2>;
const Financing = () => <h2>Financing</h2>;
const AboutUs = () => <h2>About Us</h2>;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Container sx={{ mt: 4 }}>
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
