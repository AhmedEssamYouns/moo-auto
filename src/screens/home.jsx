import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Fade,
  Slide,
  Grow,
  Zoom,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HorizontalShowcase from "../components/hstackProducts";
import CarTypeSection from "../components/carType";
import { getBanners } from "../services/apis/carsServices";
import { useInView } from "react-intersection-observer";

const fallbackImages = [
  require("../assets/imgs/download-free-car-images.jpeg"),
  require("../assets/imgs/pexels-pixabay-326259.jpg"),
  require("../assets/imgs/pexels-saimon-11556663.jpg"),
];

const HomeScreen = ({ darkMode }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(null);

  const { ref: showcaseRef, inView: showcaseInView } = useInView({
    triggerOnce: true,
  });
  const { ref: typeRef, inView: typeInView } = useInView({ triggerOnce: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res?.items?.length > 0) {
          setBanners(res.items.map((item) => item.imageUrl));
          window.scrollTo(0, 0);
        } else {
          setBanners(fallbackImages);
          window.scrollTo(0, 0);
        }
      } catch (err) {
        setBanners(fallbackImages);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentImage + 1) % banners.length;
      setNextImage(newIndex);
      setTimeout(() => {
        setCurrentImage(newIndex);
        setNextImage(null);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage, banners]);

  const handleManualChange = (index) => {
    if (index === currentImage) return;
    setNextImage(index);
    setTimeout(() => {
      setCurrentImage(index);
      setNextImage(null);
    }, 500);
  };

  const handlePrev = () => {
    handleManualChange((currentImage - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    handleManualChange((currentImage + 1) % banners.length);
  };

  const handleClick = () => {
    navigate("/cars-for-sale");
  };

  const getImageUrl = (img) => {
    if (typeof img === "string") return img;
    if (img instanceof Blob) return URL.createObjectURL(img);
    return "";
  };
  useEffect(() => {
    //scroll to very tob on load screen after load screen too
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box
        mt={8}
        sx={{
          height: isMobile ? "80vh" : "70vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${getImageUrl(banners[currentImage])})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {nextImage !== null && (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${getImageUrl(banners[nextImage])})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Fade>
          )}
        </Box>

        <Slide direction="left" in timeout={900}>
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              px: isMobile ? 3 : 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant={isMobile ? "h4" : "h2"}
              fontFamily="'Michroma', sans-serif"
              sx={{
                fontWeight: 900,
                color: "#fff",
                mb: 2,
                textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
                lineHeight: 1.2,
              }}
            >
              {t("findYourDreamCar") || "Luxury Cars. Redefined."}
            </Typography>

            <Grow in timeout={1000}>
              <Typography
                variant={isMobile ? "body1" : "h5"}
                fontFamily="'IBM Plex Sans Arabic', sans-serif"
                sx={{
                  color: "#fff",
                  maxWidth: 700,
                  mb: 4,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontSize: isMobile ? "1rem" : "1.2rem",
                }}
              >
                {t("findCarsNearYou") ||
                  "Discover high-end, exotic, and luxury vehicles tailored to your lifestyle."}
              </Typography>
            </Grow>

            <Slide direction="right" in timeout={1100}>
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  background: "linear-gradient(to right, #333, #111)",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 5,
                  py: 1.8,
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  borderRadius: 10,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "#111",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {t("exploreNow") || "Explore Now"}
              </Button>
            </Slide>
          </Box>
        </Slide>

        <Fade in timeout={1000}>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: isMobile ? "80%" : "50%",
              left: 15,
              transform: "translateY(-50%)",
              backgroundColor: darkMode ? "gray" : "#fff",
              color: "#000",
              zIndex: 3,
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
        </Fade>

        <Fade in timeout={1000}>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: isMobile ? "80%" : "50%",
              right: 15,
              transform: "translateY(-50%)",
              backgroundColor: darkMode ? "gray" : "#fff",
              color: "#000",
              zIndex: 3,
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Fade>

        <Fade in timeout={1000}>
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.2,
              zIndex: 3,
            }}
          >
            {banners.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleManualChange(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: currentImage === index ? "#fff" : "#888",
                  cursor: "pointer",
                  transition: "all 0.25s ease-in-out",
                }}
              />
            ))}
          </Box>
        </Fade>
      </Box>

      <Box ref={showcaseRef}>
        <HorizontalShowcase darkMode={darkMode} />
      </Box>

      <Box ref={typeRef} mt={6} mb={4}>
        <CarTypeSection darkMode={darkMode} />
      </Box>
    </>
  );
};

export default HomeScreen;
