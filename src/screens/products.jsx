import React, { useState } from "react";
import { Box, Grid, Typography, Pagination, CircularProgress } from "@mui/material";
import ProductCard from "../components/productItem";
import Filters from "../components/filters";
import { useTheme } from "@mui/material/styles";
import { useCars } from "../services/hooks/useCards";
import { useLanguage } from "../contexts/LanguageContext";

const brandsList = [
  "Toyota", "BMW", "Ford", "Honda", "Chevrolet", "Mercedes", "Audi", "Volkswagen",
  "Nissan", "Hyundai", "Kia", "Mazda", "Subaru", "Jaguar", "Porsche", "Tesla",
  "Lexus", "Mitsubishi", "Peugeot", "Land Rover",
];

const ProductsScreen = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage(); // Get the translation function

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [filters, setFilters] = useState({
    MinPrice: null,
    MaxPrice: null,
    CarCategory: "",
    TransmissionType: "",
    Model: null,
    IsPaginated: true,
    PageNumber: currentPage,
    PageSize: productsPerPage,
    CarState: "",
    CarBrand: null,
  });

  const { data, isLoading, error } = useCars(filters);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    setFilters((prev) => ({ ...prev, PageNumber: value }));
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
        {t("vehicles")}
      </Typography>

      <Filters allBrands={brandsList} setFilters={setFilters} />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {t("Something went wrong!")}
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent={"center"}>
            {data?.cars?.map((car) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
                <ProductCard car={car} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil((data?.total || 1) / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductsScreen;
