import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
} from "@mui/material";
import { Search as SearchIcon, Tune as FilterIcon } from "@mui/icons-material";
import { useLanguage } from "../contexts/LanguageContext";
import ProductCard from "./productItem";
import { useLatestCars } from "../services/hooks/useCards";
import { motion, AnimatePresence } from "framer-motion";

const BestSelling = ({ isChild = false, withSearch = true }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const { data: cars, isLoading } = useLatestCars();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) {
    return (
      <Box
        minHeight="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
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

  return (
    <Box
      sx={{
        pt: 10,
        pb: 6,
        px: 2,
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000000, #120000ff)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            fontFamily: "Michroma",
            color: "#B30000",
          }}
        >
          {t("NewArrivals")}
        </Typography>
      </motion.div>

      {withSearch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
                maxWidth: 900,
                px: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder={t("search")}
                fullWidth
                sx={{
                  borderRadius: 2,
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.08)"
                    : "#f5f5f5",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { border: "none" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
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
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#e0e0e0",
                  "&:hover": {
                    backgroundColor: isDarkMode ? "#3a3a3a" : "#d5d5d5",
                  },
                }}
              >
                <FilterIcon />
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
                  elevation={2}
                  sx={{
                    maxWidth: 900,
                    mx: "auto",
                    px: 3,
                    py: 3,
                    borderRadius: 3,
                    mb: 4,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    backgroundColor: isDarkMode ? "#1e1e1e" : "#fdfdfd",
                  }}
                >
                  <TextField
                    variant="outlined"
                    type="number"
                    placeholder={t("minPrice")}
                    sx={{
                      width: 150,
                      backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": { border: "none" },
                      },
                    }}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    type="number"
                    placeholder={t("maxPrice")}
                    sx={{
                      width: 150,
                      backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": { border: "none" },
                      },
                    }}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            width: "100%",
            maxWidth: 1150,
          }}
        >
          {filteredCars?.length > 0 ? (
            filteredCars.map((car, index) => (
              <Grid
                item
                key={car.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ width: 320 }}
                >
                  <ProductCard car={car} />
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              mt={10}
              sx={{ textAlign: "center", width: "100%", color: "#fff" }}
            >
              {t("noNewCarsFound")}
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default BestSelling;
