import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
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
import { useTheme } from "@mui/material/styles";
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
    setActiveIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Box
      onClick={() => navigate(`/product/${car.id}`)}
      sx={{
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        height: 360,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        cursor: "pointer",
      }}
    >
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={(index) => setActiveIndex(index)}
        enableMouseEvents
        style={{ height: "120%" }}
      >
        {car.images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`${car.name}-${index}`}
            sx={{
              width: "100%",
              height: "360px",
              objectFit: "cover",
              filter: "brightness(0.8)",
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
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
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
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
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
          top: 16,
          left: 16,
          bgcolor: car.status === 1 ? "#fff" : "#ffe082",
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

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          px: 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {car.name} - {car.model}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            icon={<EmojiTransportationIcon fontSize="small" />}
            label={car.brandName}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              px: 1,
            }}
          />
          <Chip
            icon={<SettingsIcon fontSize="small" />}
            label={t(car.transmission === 2 ? "automatic" : "manual")}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              px: 1,
            }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {car.price > 0
            ? `${t("EGP")} ${Number(car.price).toLocaleString()}`
            : t("Price Not Available")}
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("linkCopied")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ProductCard;
