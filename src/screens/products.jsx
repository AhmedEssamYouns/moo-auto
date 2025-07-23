import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductCard from "../components/productItem";
import Filters from "../components/filters";
import { useBrands, useCars } from "../services/hooks/useCards";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import MapIcon from "@mui/icons-material/Map";

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

  const isMobile = useMediaQuery("(max-width: 1000px)");

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
        background: "linear-gradient(to bottom, #000000, #120000ff)",
        color: "#fff",
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
              color: "#B30000",
              letterSpacing: 1,
            }}
          >
            {t("Our Cars")}
          </Typography>
        </motion.div>

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
            custom={3}
          >
            <Filters
              filters={filters}
              brandsData={brandsData}
              onApplyFilters={handleApplyFilters}
            />
          </motion.div>
        )}

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "#B30000" }} />
          </Box>
        ) : error ? (
          <Typography textAlign="center" mt={4}>
            {t("NoCarsFound")}
          </Typography>
        ) : (
          <>
            <Grid container spacing={4} justifyContent="center">
              {data?.items?.map((car, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={car.id}
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  component={motion.div}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeSlide}
                  custom={index % 3}
                >
                  <ProductCard car={car} />
                </Grid>
              ))}
            </Grid>

            <motion.div
              variants={fadeSlide}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  mt: 6,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
                    boxShadow: "0 0 20px rgba(255, 0, 0, 0.2)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmojiTransportationIcon sx={{ color: "#FF4444" }} />
                    <Typography fontWeight="bold" fontSize={isMobile ? 14 : 18}>
                      {t("Total Cars")}:{" "}
                      <span style={{ color: "#ff3333" }}>
                        {data?.totalCount || 0}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MapIcon sx={{ color: "#FF4444" }} />
                    <Typography fontWeight="bold" fontSize={isMobile ? 14 : 18}>
                      {t("Page")}:{" "}
                      <span style={{ color: "#ff3333" }}>{currentPage}</span> /{" "}
                      {data?.totalPages || 1}
                    </Typography>
                  </Box>
                </Box>

                <Pagination
                  count={data?.totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#fff",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#B30000",
                      color: "#fff",
                    },
                  }}
                />
              </Box>
            </motion.div>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductsScreen;
