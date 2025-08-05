import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import SwipeableViews from "react-swipeable-views";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const LargeCarCard = ({ car }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState([0]); // preload first image only

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % car.images.length;
    setActiveIndex(nextIndex);
    setLoadedImages((prev) =>
      prev.includes(nextIndex) ? prev : [...prev, nextIndex]
    );
  };

  const handlePrev = () => {
    const prevIndex =
      activeIndex === 0 ? car.images.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    setLoadedImages((prev) =>
      prev.includes(prevIndex) ? prev : [...prev, prevIndex]
    );
  };

  return (
    <Box
      onClick={() => navigate(`/product/${car.id}`)}
      sx={{
        position: "relative",
        width: isMobile ? "74vw" : "60vw",
        height: isMobile ? "40vh" : "70vh",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={(index) => {
          setActiveIndex(index);
          setLoadedImages((prev) =>
            prev.includes(index) ? prev : [...prev, index]
          );
        }}
        enableMouseEvents
        style={{ height: isMobile ? "40vh" : "72vh", width: "100%" }}
        containerStyle={{ touchAction: "pan-y", pointerEvents: "none" }}
      >
        {car.images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={loadedImages.includes(index) ? img : car.images[0]}
            alt={`${car.name}-${index}`}
            loading={index === 0 ? "eager" : "lazy"}
            sx={{
              width: "100%",
              height: isMobile ? "40vh" : "70vh",
              bgcolor: "white",
              objectFit: isMobile ? "fill" : "cover",
              filter: "brightness(0.95)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        ))}
      </SwipeableViews>

      {!isMobile && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            zIndex: 5,
            "&:hover": {
              background: "rgba(0,0,0,0.6)",
            },
          }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      {!isMobile && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            zIndex: 5,
            "&:hover": {
              background: "rgba(0,0,0,0.6)",
            },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      )}

      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40%",
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 3,
          color: "#fff",
          maxWidth: "60%",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          sx={{ mb: 1, textShadow: "1px 1px 6px rgba(0,0,0,0.8)" }}
        >
          {car.name} - {car.model}
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{
            mb: 2,
            textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            fontWeight: 300,
          }}
        >
          {car.brandName} • {t(car.transmission === 2 ? "automatic" : "manual")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#fff",
            textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
          }}
        >
          {car.price > 0
            ? `${t("EGP")} ${Number(car.price).toLocaleString()}`
            : t("Price Not Available")}
        </Typography>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/request-car");
          }}
          sx={{
            background: "linear-gradient(to right, #fff, #ddd)",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            "&:hover": {
              background: "#eee",
            },
          }}
        >
          {t("orderNow") || "Order Now"}
        </Button>
      </Box>
    </Box>
  );
};

export default LargeCarCard;
