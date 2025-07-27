import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Stack,
  Pagination,
  useTheme,
} from "@mui/material";
import { Search as SearchIcon, Tune as FilterIcon } from "@mui/icons-material";
import { useLanguage } from "../contexts/LanguageContext";
import ProductCard from "./productItem";
import { useLatestCars } from "../services/hooks/useCards";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const BestSelling = ({ isChild = false, withSearch = true }) => {
  const { t } = useLanguage();
  const { data: cars, isLoading } = useLatestCars();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  if (isLoading) {
    return (
      <Box
        minHeight="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: darkMode ? "#121212" : "#fff" }}
      >
        <CircularProgress color="primary" size={50} thickness={4} />
      </Box>
    );
  }

  const filteredCars = cars?.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const price = car.price || 0;
    const matchesPrice =
      (minPrice === "" || price >= Number(minPrice)) &&
      (maxPrice === "" || price <= Number(maxPrice));
    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredCars?.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box
      sx={{
        pt: 10,
        pb: 8,
        px: 2,
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(to bottom, #121212, #1e1e1e)"
          : "linear-gradient(to bottom, #ffffff, #f2f2f2)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 5,
            textAlign: "center",
            fontFamily: "Michroma",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          {t("NewArrivals")}
        </Typography>
      </motion.div>

      {withSearch && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
                maxWidth: 1200,
                px: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder={t("search")}
                color="black"
                fullWidth
                sx={{
                  borderRadius: 2,
                  color: "#D32F2F",
                  backgroundColor: darkMode ? "#2a2a2a" : "#f1f1f1",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { border: "none" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#D32F2F" }} />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  borderRadius: 2,
                  width: 48,
                  height: 48,
                  backgroundColor: darkMode ? "#3a3a3a" : "#eeeeee",
                  "&:hover": {
                    backgroundColor: darkMode ? "#4a4a4a" : "#dddddd",
                  },
                }}
              >
                <FilterIcon sx={{ color: "#D32F2F" }} />
              </IconButton>
            </Box>
          </Box>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    maxWidth: 700,
                    mx: "auto",
                    px: 4,
                    py: 4,
                    borderRadius: 4,
                    mb: 4,
                    backgroundColor: darkMode ? "#2b2b2b" : "#fafafa",
                    boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <TextField
                      variant="filled"
                      type="number"
                      placeholder={t("minPrice")}
                      label={t("minPrice")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">EGP</InputAdornment>
                        ),
                      }}
                      sx={{
                        width: 200,
                        backgroundColor: darkMode ? "#3b3b3b" : "#f3f3f3",
                        borderRadius: 2,
                      }}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <TextField
                      variant="filled"
                      type="number"
                      placeholder={t("maxPrice")}
                      label={t("maxPrice")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">EGP</InputAdornment>
                        ),
                      }}
                      sx={{
                        width: 200,
                        backgroundColor: darkMode ? "#3b3b3b" : "#f3f3f3",
                        borderRadius: 2,
                      }}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </Stack>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <Box display="flex" justifyContent="center" width="100%">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ width: "100%", maxWidth: 1400 }}
        >
          {paginatedCars?.length > 0 ? (
            paginatedCars.map((car, index) => (
              <Grid item key={car.id} sx={{ display: "flex", justifyContent: "center" }}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ width: 420 }}
                >
                  <ProductCard car={car} />
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              mt={10}
              sx={{ textAlign: "center", width: "100%", color: darkMode ? "#ccc" : "#444" }}
            >
              {t("noNewCarsFound")}
            </Typography>
          )}
        </Grid>
      </Box>

      {totalPages > 1 && (
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default BestSelling;
