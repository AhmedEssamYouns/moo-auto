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
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import SwipeableViews from "react-swipeable-views";

const ProductCard = ({ car }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
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
    setActiveIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % car.images.length);
  };

  return (
    <Card
      onClick={() => navigate(`/product/${car.id}`)}
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        background: isDarkMode
          ? "linear-gradient(145deg, #1e1e1e, #2a2a2a)"
          : "linear-gradient(145deg, #ffffff, #f0f0f0)",
        border: "none",
        transition: "all 0.4s ease",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.6)"
          : "0 10px 30px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <Box sx={{ position: "relative", height: 240 }}>
        <SwipeableViews
          index={activeIndex}
          onChangeIndex={setActiveIndex}
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
                height: "240px",
                objectFit: "cover",
              }}
            />
          ))}
        </SwipeableViews>

        {car.images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                background: "rgba(0,0,0,0.4)",
                color: "white",
                "&:hover": {
                  background: "rgba(0,0,0,0.6)",
                },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                bottom: 16,
                left: 72,
                background: "rgba(0,0,0,0.4)",
                color: "white",
                "&:hover": {
                  background: "rgba(0,0,0,0.6)",
                },
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        <Chip
          label={t(car.status === 1 ? "new" : "used")}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            bgcolor: car.status === 1 ? "#ffff" : "#ffe082",
            color: "#000",
            fontWeight: "bold",
          }}
        />

        <IconButton
          onClick={handleShare}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.15)",
            color: "white",
            "&:hover": {
              background: "#fff",
              color: "#000",
            },
          }}
        >
          <ShareRoundedIcon />
        </IconButton>
      </Box>

      <CardContent
        sx={{
          px: 3,
          py: 2,
          color: isDarkMode ? "#f5f5f5" : "#111",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
          {car.name} - {car.model}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            icon={<EmojiTransportationIcon fontSize="small" />}
            label={car.brandName}
            size="small"
            sx={{
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: isDarkMode ? "#444" : "#ccc",
              color: "inherit",
              px: 1,
            }}
          />
          <Chip
            icon={<SettingsIcon fontSize="small" />}
            label={t(car.transmission === 2 ? "automatic" : "manual")}
            size="small"
            sx={{
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: isDarkMode ? "#444" : "#ccc",
              color: "inherit",
              px: 1,
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
            sx={{ fontWeight: "bold", color: isDarkMode ? "#ffff" : "#ffff" }}
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
              color: isDarkMode ? "#ffff" : "#ffff",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {t("viewDetails")}
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
