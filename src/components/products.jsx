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
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLanguage } from "../contexts/LanguageContext";
import { FuelType, TransmissionType } from "../types/e-nums";
import ProductCard from "./productItem";

const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    model: "2023",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "45,000",
    mileage: "10,000 Miles",
    fuel: FuelType.ELECTRIC,
    transmission: TransmissionType.AUTOMATIC,
  },
  {
    id: 2,
    name: "BMW X5",
    model: "2022",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "65,000",
    mileage: "5,000 Miles",
    fuel: FuelType.DIESEL,
    transmission: TransmissionType.AUTOMATIC,
  },
];

const BestSelling = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(max-width: 1500px)");
  const { t } = useLanguage(); // Get translation function

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
        {t("bestSellingCars")}
      </Typography>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
            <ProductCard car={car} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSelling;
