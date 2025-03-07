import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import ProductCard from "../components/productItem";
import Filters from "../components/filters";
import { useTheme } from "@mui/material/styles";
import { useBrands, useCars } from "../services/hooks/useCards";
import { useLanguage } from "../contexts/LanguageContext";

const ProductsScreen = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [filters, setFilters] = useState({
    MinPrice: null,
    MaxPrice: null,
    CarCategory: null,
    TransmissionType: null,
    Model: null,
    IsPaginated: true,
    PageNumber: currentPage,
    PageSize: productsPerPage,
    CarState: null,
    CarBrand: null,
  });

  const { data, isLoading, error } = useCars(filters);
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useBrands();

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    setFilters((prev) => ({ ...prev, PageNumber: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      PageNumber: 1,
    }));
  };

  const handleClearFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: null, PageNumber: 1 }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      MinPrice: null,
      MaxPrice: null,
      CarCategory: null,
      TransmissionType: null,
      Model: null,
      IsPaginated: true,
      PageNumber: 1,
      PageSize: productsPerPage,
      CarState: null,
      CarBrand: null,
    });
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" textAlign="center" mt={2} mb={4}>
        {t("Our Cars")}
      </Typography>

      {/* Show loading if brands are still fetching */}
      {brandsLoading ? (
        <Typography textAlign="center">{t("Loading brands...")}</Typography>
      ) : brandsError ? (
        <Typography color="error" textAlign="center">
          {t("Failed to load brands")}
        </Typography>
      ) : (
        <Filters filters={filters} brandsData={brandsData} onApplyFilters={handleApplyFilters} />
      )}

      {/* Active Filters */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {Object.entries(filters).map(([key, value]) =>
          value &&
          key !== "PageNumber" &&
          key !== "PageSize" &&
          key !== "IsPaginated" ? (
            <Chip
              key={key}
              label={`${key}: ${value}`}
              onDelete={() => handleClearFilter(key)}
              color="primary"
            />
          ) : null
        )}

        {/* Clear All Filters Button */}
        {Object.entries(filters).some(
          ([key, value]) =>
            value !== null &&
            key !== "PageNumber" &&
            key !== "PageSize" &&
            key !== "IsPaginated"
        ) && (
          <Button
            onClick={handleClearAllFilters}
            variant="outlined"
            color="secondary"
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Loading & Error Handling */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="black" textAlign="center">
          {t("NoCarsFound")}
        </Typography>
      ) : (
        <>
          {/* Product List */}
          <Grid container spacing={3} justifyContent={"center"}>
            {data?.items?.map((car) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
                <ProductCard car={car} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={data?.totalPages}
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
