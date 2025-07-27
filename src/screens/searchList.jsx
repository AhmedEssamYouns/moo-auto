import React from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ProductCard from "../components/productItem";
import { useTheme } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const CarsListScreen = () => {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const location = useLocation();
  const { cars, searchText } = location.state || {};

  if (!cars) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        pt:10,
        minHeight: "100vh",
      }}
    >
      <Typography
        sx={{
          direction: language === "ar" ? "rtl" : "ltr",
          textAlign: language === "ar" ? "right" : "center",
        }}
        variant="h4"
        mt={2}
        mb={4}
      >
        {searchText
          ? `${t("Results for")} "${searchText}"`
          : t("Available Cars")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
          mb: 3,
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: theme.palette.background.paper,
          flexDirection: language === "ar" ? "row-reverse" : "row",
        }}
      >
       
        <Typography variant={isMobile ? "body2" : "h6"} fontWeight="bold">
          {t("Total Cars")}{" "}
          <span style={{ color: theme.palette.primary.main }}>
            {cars.length}
          </span>
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
            <ProductCard car={car} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarsListScreen;
