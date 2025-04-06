import React from "react";
import {
  Box,
  Card,
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
import SpeedIcon from "@mui/icons-material/Speed";
import { baseUrl } from "../utils/baseUrl";
import SwipeableViews from "react-swipeable-views";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

const ProductCard = ({ car }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const shareUrl = `${baseUrl}/cars/Shared/${car.id}`;

  const handleShare = async (event) => {
    event.stopPropagation();

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
      navigator?.clipboard?.writeText(shareUrl);
      setSnackbarOpen(true);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % car.images.length);
  };

  return (
    <Card
      onClick={() => navigate(`/product/${car.id}`)}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
        bgcolor: isDarkMode ? "#1E1E1E" : "white",
      }}
    >
      {/* Swipeable Image Carousel */}
      <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
        <SwipeableViews
          index={activeIndex}
          onChangeIndex={(i) => setActiveIndex(i)}
          enableMouseEvents
          style={{ height: "100%" }}
        >
          {car.images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`${car.name}-${index}`}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          ))}
        </SwipeableViews>

        {/* Arrows */}
        {car.images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </>
        )}

        {/* Status Label */}
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

        {/* Share Button */}
        <IconButton
          onClick={handleShare}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
            "&:hover": {
              bgcolor: "#4CAF50",
              color: "white",
            },
          }}
        >
          <IosShareIcon sx={{ transform: "scaleX(-1)" }} />
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: isDarkMode ? "white" : "black" }}
        >
          {car.name} - {car.model}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5, mt: 1, mb: 2 }}>
          <Chip
            icon={<DirectionsCarIcon fontSize="small" />}
            label={t(`${car?.brandName}`)}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
              color: isDarkMode ? "white" : "black",
              px: 0.5,
              minWidth: "auto",
            }}
          />
          <Chip
            icon={<SpeedIcon fontSize="small" />}
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
            {car.price > 0
              ? `EGP ${Number(car.price).toLocaleString()}`
              : t("Price Not Available")}
          </Typography>
          <Button
            onClick={(e) => {
              e.stopPropagation();
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("linkCopied")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default ProductCard;
