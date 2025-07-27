import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
  Button,
  useTheme,
} from "@mui/material";
import ProductCard from "../components/productItem";
import Filters from "../components/filters";
import { useBrands, useCars } from "../services/hooks/useCards";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsScreen = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const queryType = new URLSearchParams(location.search).get("type");

  const [filters, setFilters] = useState({
    MinPrice: null,
    MaxPrice: null,
    CarCategory: queryType || null,
    TransmissionType: null,
    Model: null,
    IsPaginated: true,
    PageNumber: 1,
    PageSize: productsPerPage,
    CarState: null,
    CarBrand: null,
  });

  const finalFilters = { ...filters };

  const { data, isLoading, error, isFetching } = useCars(finalFilters);
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useBrands();

  const handleApplyFilters = (newFilters) => {
    setCurrentPage(1);
    setShowAll(false);
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      IsPaginated: true,
      PageNumber: 1,
      PageSize: productsPerPage,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      PageNumber: newPage,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowAll = () => {
    setShowAll(true);
    setFilters((prev) => ({
      ...prev,
      IsPaginated: false,
      PageNumber: 1,
      PageSize: null,
    }));
  };

  const handleShowPaginated = () => {
    setShowAll(false);
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      IsPaginated: true,
      PageNumber: 1,
      PageSize: productsPerPage,
    }));
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setShowAll(false);
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
    navigate("/cars-for-sale", { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeSlide = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <Box
      sx={{
        pt: 10,
        minHeight: "100vh",
        background: isDark ? "#111" : "#fff",
        color: isDark ? "#eee" : "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: isMobile ? "100%" : "80%", p: isMobile ? 2 : 4 }}>
        <motion.div
          variants={fadeSlide}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Typography
            variant="h4"
            textAlign="center"
            mt={2}
            mb={4}
            fontWeight="bold"
            sx={{
              fontFamily: "Michroma",
              fontSize: 40,
              color: isDark ? "#fff" : "black",
              letterSpacing: 1,
            }}
          >
            {t("Our Cars")}
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {queryType && (
            <Button
              onClick={handleClearFilters}
              variant="outlined"
              sx={{
                color: "#B30000",
                borderColor: "#B30000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#B30000",
                  color: "#fff",
                },
              }}
            >
              {t("Show all cars")}
            </Button>
          )}

          {showAll && (
            <Button
              onClick={handleClearFilters}
              variant="outlined"
              sx={{
                color: "#B30000",
                borderColor: "#B30000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#B30000",
                  color: "#fff",
                },
              }}
            >
              {t("Clear Filters")}
            </Button>
          )}
        </Box>

        {brandsLoading ? (
          <Typography textAlign="center">{t("Loading brands...")}</Typography>
        ) : brandsError ? (
          <Typography color="error" textAlign="center" mt={2}>
            {t("Failed to load brands")}
          </Typography>
        ) : (
          <motion.div
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Filters
              filters={filters}
              brandsData={brandsData}
              onApplyFilters={handleApplyFilters}
            />
          </motion.div>
        )}

        {error ? (
          <Typography textAlign="center" mt={4}>
            {t("NoCarsFound")}
          </Typography>
        ) : (
          <>
            <Grid container spacing={4} justifyContent="center" mt={4}>
              {data?.items?.map((car, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={car.id}
                  component={motion.div}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeSlide}
                  custom={index % 3}
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <ProductCard car={car} />
                </Grid>
              ))}
            </Grid>

            {(isLoading || isFetching) && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress sx={{ color: "#B30000" }} />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 6,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {!showAll &&
                data?.totalPages > 1 &&
                Array.from({ length: data.totalPages }).map((_, idx) => (
                  <Button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    variant={currentPage === idx + 1 ? "contained" : "outlined"}
                    sx={{
                      color: currentPage === idx + 1 ? "#fff" : "#B30000",
                      backgroundColor:
                        currentPage === idx + 1 ? "#B30000" : "#fff",
                      borderColor: "#B30000",
                      "&:hover": {
                        backgroundColor: "#B30000",
                        color: "#fff",
                      },
                    }}
                  >
                    {idx + 1}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductsScreen;
