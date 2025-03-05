import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLanguage } from "../contexts/LanguageContext";

const ProductCard = ({ car }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
        bgcolor: isDarkMode ? "#1E1E1E" : "white",
      }}
    >
      <Box sx={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <CardMedia
          component="img"

          image={"https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*"}
          alt={car.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Chip
          label={t("greatPrice")}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: "#4CAF50",
            color: "white",
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
          }}
        >
          <BookmarkBorderIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: isDarkMode ? "white" : "black" }}
        >
          {car.name} - {car.model}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, mt: 1, mb: 2 }}>
          <Chip
            icon={<LocalGasStationIcon fontSize="small" />}
            label={t(`fuel.${car.fuel}`)}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
              color: isDarkMode ? "white" : "black",
              px: 0.5,
              minWidth: "auto",
            }}
          />
          <Chip
            icon={<DirectionsCarIcon fontSize="small" />}
            label={t(`transmission.${car.transmission}`)}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
              color: isDarkMode ? "white" : "black",
              px: 0.5,
              minWidth: "auto",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4CAF50" }}>
            EGP{car.price}
          </Typography>
          <Button sx={{ color: isDarkMode ? "white" : "black", textTransform: "none" }}>
            {t("viewDetails")} →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;