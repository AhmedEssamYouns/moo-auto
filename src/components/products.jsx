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
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useLanguage } from "../contexts/LanguageContext";
import ProductCard from "./productItem";
import { useLatestCars } from "../services/hooks/useCards";

const BestSelling = ({ isChild = false, withSearch = true }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(max-width: 1500px)");
  const { t } = useLanguage();
  const { data: cars, isLoading } = useLatestCars();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <Box
        minHeight={"70vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress color="primary" size={50} thickness={4} />
      </Box>
    );
  }

  const filteredCars = cars?.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, minHeight: "80vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: isDarkMode ? "white" : "black",
        }}
      >
        {t("NewArrivals")}
      </Typography>

      {withSearch && (
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder={t("search")}
            fullWidth
            sx={{
              maxWidth: 400,
              backgroundColor: isDarkMode ? "#1E293B" : "#E3F2FD",
              borderRadius: 2,
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
        </Box>
      )}

      <Grid container alignItems="center" justifyContent="center" spacing={3}>
        {filteredCars?.length > 0 ? (
          filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
              <ProductCard car={car} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" mt={20} sx={{ textAlign: "center" }}>
            {t("noNewCarsFound")}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default BestSelling;
