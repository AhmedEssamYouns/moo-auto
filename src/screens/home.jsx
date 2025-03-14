import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  Button,
  ButtonBase,
} from "@mui/material";
import { ReactComponent as CarSVG } from "../assets/svgs/home2.svg";
import { ReactComponent as CarToyta } from "../assets/svgs/car.svg";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import InfoCard from "../components/infoCard";
import BestSelling from "../components/products";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { t, language } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilter("");
  };
  const handleClick = () => {
    navigate("/cars-for-sale");
  };

  return (
    <Box
      mb={4}
      sx={{
        minHeight: "80vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      <Box
        sx={{
          minHeight: "80vh",
          scrollSnapAlign: "start",
        }}
      >
        <Box
          sx={{
            pt: 5,
            pb: 4,
            px: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Small Header */}
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            {t("findCarsNearYou")}
          </Typography>

          {/* Big Bold Header */}
          <Typography
            variant="h3"
            fontFamily={
              language === "ar"
                ? "'Marhey', sans-serif"
                : "'IBM Plex Sans Arabic', sans-serif"
            }
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              mb: 3,
            }}
          >
            {t("findYourDreamCar")}
          </Typography>

          {/* Car SVG */}
          <Box
  sx={{
    width: "80%",
    maxWidth: 500,
    opacity: 0,
    transform:
      theme.palette.mode === "dark" ? "translateX(-100%)" : "scale(0.8)", // Slide left in dark mode, shrink in light mode
    animation: theme.palette.mode === "dark"
      ? "slideIn 0.8s ease-out forwards"
      : "scaleUp 0.8s ease-out forwards",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,

    "@keyframes slideIn": {
      "0%": { opacity: 0, transform: "translateX(-100%)" },
      "100%": { opacity: 1, transform: "translateX(0)" },
    },

    "@keyframes scaleUp": {
      "0%": { opacity: 0, transform: "scale(0.8)" }, // Start small
      "100%": { opacity: 1, transform: "scale(1)" }, // Grow to normal size
    },
  }}
>

            {/* Animated "Explore Now" Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                fontWeight: "bold",
                px: 3,
                py: 1,
                animation: "dance 1.5s infinite ease-in-out",
                "@keyframes dance": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
              onClick={handleClick}
            >
              {t("exploreNow")}
            </Button>
            {theme.palette.mode === "dark" ? (
              <CarSVG
                width="100%"
                height="auto"
                fill={theme.palette.text.primary}
              />
            ) : (
              <CarToyta
                width="70%"
                height="auto"
                fill={theme.palette.text.primary}
              />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            pb: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
            width: "100%",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <InfoCard
            bgColor={theme.palette.mode === "dark" ? "#1E293B" : "#E3F2FD"}
            title={t("lookingForCar")}
            description={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography>{t("lookingForCarDesc")}</Typography>
              </Box>
            }
            Svg={CarToyta}
            onclick={() => navigate("/cars-for-sale")}
            btn={theme.palette.mode === "dark" ? "#60A5FA" : "#1E40AF"}
            sx={{
              animation: "slideInRight 1s ease-out",
              "@keyframes slideInRight": {
                "0%": { transform: "translateX(100%)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          />

          {/* <InfoCard
          onclick={() => navigate("/cars-for-sale")}
          bgColor={theme.palette.mode === "dark" ? "#3F1D38" : "#FEE2E2"}
          title={t("lookingToSellCar")}
          description={t("lookingToSellCarDesc")}
          btn={theme.palette.mode === "dark" ? "#EC4899" : "#9B1C1C"}
          sx={{
            animation: "slideInRight 1s ease-out",
            "@keyframes slideInRight": {
              "0%": { transform: "translateX(-100%)", opacity: 0 },
              "100%": { transform: "translateX(0)", opacity: 1 },
            },
          }}
        /> */}
        </Box>
      </Box>
      <Box sx={{ height: "100vh", scrollSnapAlign: "start" }}>
        <BestSelling withSearch={false} isChild={true} />
      </Box>
    </Box>
  );
};

export default HomeScreen;
