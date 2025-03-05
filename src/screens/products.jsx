import React, { useState } from "react";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import ProductCard from "../components/productItem";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { productsData as products } from "../data/products";
import Filters from "../components/filters";

const brandsList = [
    "Toyota",
    "BMW",
    "Ford",
    "Honda",
    "Chevrolet",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Jaguar",
    "Porsche",
    "Tesla",
    "Lexus",
    "Mitsubishi",
    "Peugeot",
    "Land Rover",
    "BMW",
  ];
const ProductsScreen = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(max-width: 1500px)");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: isDarkMode ? "white" : "black",
        }}
      >
        {`Products ${products.length}`}
      </Typography>
      <Filters allBrands={brandsList} />
      <Grid container spacing={3} justifyContent={"center"}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={product.id}>
            <ProductCard car={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductsScreen;
