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
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/Reply";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed"; // Better icon for transmission

const ProductCard = ({ car }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const shareUrl = `${window.location.origin}/product/${car.id || 1}`;

  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: car.name,
          text: `Check out this car: ${car.name} - ${car.model}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setSnackbarOpen(true);
    }
  };

  return (
    <Card
      onClick={() => {
        navigate(`/product/${car.id}`);
      }}
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
          image={car.images[0] ||
            "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*"
          }
          alt={car.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Chip
          label={t(car.status == 1 ? "new" : "used")}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: car.status == 1 ? "#4CAF50" : "#FFC107",
            color: car.status == 1 ? "white" : "black",
          }}
        />
        <IconButton
          onClick={handleShare}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            bgcolor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "#4CAF50",
              color: "white",
            },
          }}
        >
          <IosShareIcon sx={{ transform: "scaleX(-1)" }} />
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
  {/* Brand Name */}
  <Chip
    icon={<DirectionsCarIcon fontSize="small" />} // Represents a car brand
    label={t(`${car?.brandName}`)}
    size="small"
    sx={{
      bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
      color: isDarkMode ? "white" : "black",
      px: 0.5,
      minWidth: "auto",
    }}
  />
  
  {/* Transmission Type */}
  <Chip
    icon={<SpeedIcon fontSize="small" />} // Better for automatic/manual indication
    label={t(`${car.transmission == 2 ? "automatic" : "manual"}`)}
    size="small"
    sx={{
      bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
      color: isDarkMode ? "white" : "black",
      px: 0.5,
      minWidth: "auto",
    }}
  />
</Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#4CAF50" }}
          >
            EGP{car.price}
          </Typography>
          <Button
            onClick={() => {
              navigate(`/product/${car.id}`);
            }}
            sx={{
              color: isDarkMode ? "white" : "black",
              textTransform: "none",
            }}
          >
            {t("viewDetails")} →
          </Button>
        </Box>
      </CardContent>

      {/* Snackbar for Copy Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default ProductCard;
