import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Zoom,
  Slide,
  Fade,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const images = [
  require("../assets/imgs/download-free-car-images.jpeg"),
  require("../assets/imgs/pexels-pixabay-326259.jpg"),
  require("../assets/imgs/pexels-saimon-11556663.jpg"),
];

const HomeScreen = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate("/cars-for-sale");
  };

  return (
    <Box
      mb={4}
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        px: isMobile ? 3 : 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "overlay",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <Slide in direction="left" timeout={900}>
        <Typography
          variant="h2"
          fontFamily={"'Michroma', sans-serif"}
          sx={{
            fontWeight: 900,
            color: "#f5f5f5",
            mb: 2,
            textShadow: "2px 2px 12px rgba(0,0,0,0.9)",
            lineHeight: 1.2,
          }}
        >
          {t("findYourDreamCar") || "Luxury Cars. Redefined."}
        </Typography>
      </Slide>

      <Fade in timeout={1500}>
        <Typography
          variant="h5"
          fontFamily={"'IBM Plex Sans Arabic', sans-serif"}
          sx={{
            color: "#e0e0e0",
            maxWidth: 700,
            mb: 4,
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {t("findCarsNearYou") ||
            "Discover high-end, exotic, and luxury vehicles tailored to your lifestyle. Precision-engineered for those who demand the best."}
        </Typography>
      </Fade>

      <Zoom in timeout={2000}>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            background: "linear-gradient(90deg, #c31432 0%, #240b36 100%)",
            color: "#fff",
            fontWeight: "bold",
            px: 5,
            py: 1.8,
            fontSize: "1.1rem",
            borderRadius: 10,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
              transform: "scale(1.05)",
            },
          }}
        >
          {t("exploreNow") || "Explore Now"}
        </Button>
      </Zoom>
    </Box>
  );
};

export default HomeScreen;
