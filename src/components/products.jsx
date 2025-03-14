import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import ProductCard from "./productItem";
import { useLatestCars } from "../services/hooks/useCards";

const BestSelling = (isChild) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(max-width: 1500px)");
  const { t } = useLanguage(); // Get translation function
  const { data: cars, isLoading } = useLatestCars();
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
  return (
    
    <Box sx={{ p: 4,minHeight: "80vh" }}>
    {cars?.length > 0 || isChild && (
      <>
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
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        {cars?.length > 0 ? (
          cars.map((car) => (
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
      </>
    )}
    </Box>
  );
};

export default BestSelling;
