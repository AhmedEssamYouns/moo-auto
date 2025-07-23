import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Grid,
  Fade,
  Stack,
} from "@mui/material";
import {
  LocalGasStation,
  DirectionsCar,
  Share,
  DirectionsCarFilled,
  ElectricCar,
  AirportShuttle,
  SportsMotorsports,
  LocalShipping,
  CheckCircle,
  Restore,
} from "@mui/icons-material";
import { baseUrl } from "../utils/baseUrl";
import { useLanguage } from "../contexts/LanguageContext";

const ProductDetails = ({ product, t, isMobile, isDarkMode }) => {
  const shareUrl = `${baseUrl}/cars/Shared/${product.id}`;
  const { language } = useLanguage();

  const CarCategory = {
    1: { name: "Sedan", icon: <DirectionsCarFilled /> },
    2: { name: "SUV", icon: <AirportShuttle /> },
    3: { name: "Hatchback", icon: <DirectionsCarFilled /> },
    4: { name: "Coupe", icon: <DirectionsCarFilled /> },
    5: { name: "Convertible", icon: <DirectionsCarFilled /> },
    6: { name: "Truck", icon: <LocalShipping /> },
    7: { name: "Electric", icon: <ElectricCar /> },
    8: { name: "Sports", icon: <SportsMotorsports /> },
  };

  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: product.name,
          text:
            language === "en"
              ? `Check out this car: ${product.name} - ${product.model}`
              : `تحقق من هذه السيارة: ${product.name} - ${product.model}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(t("linkCopied"));
    }
  };

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          px: isMobile ? 2 : 4,
          py: 4,
          background: isDarkMode ? "#1a1a1a" : "#fafafa",
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <Helmet>
          <title>{`${product.name} - ${product.model}`}</title>
          <meta property="og:title" content={`${product.name} - ${product.model}`} />
          <meta property="og:description" content={product.description.substring(0, 150)} />
          <meta property="og:image" content={product.images[0]} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="product" />
        </Helmet>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color={isDarkMode ? "white" : "black"}>
              {product.name} - {product.model}
            </Typography>
            <Typography variant="h6" color="#4CAF50" mt={1}>
              {t("price")}: {t('EGP')} {Number(product.price).toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={handleShare}
            sx={{
              borderRadius: 3,
              backgroundColor: "#1976D2",
              "&:hover": {
                backgroundColor: "#125ea5",
              },
            }}
          >
            {t("share")}
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap" spacing={1} mb={3}>
          <Chip
            icon={product.status === 1 ? <CheckCircle /> : <Restore />}
            label={t(product.status === 1 ? "new" : "used")}
            sx={{
              bgcolor: isDarkMode ? "#2d2d2d" : "#e1e1e1",
              color: isDarkMode ? "white" : "black",
            }}
          />
          <Chip
            icon={<DirectionsCar />}
            label={t(product.transmission === 2 ? "automatic" : "manual")}
            sx={{
              bgcolor: isDarkMode ? "#2d2d2d" : "#e1e1e1",
              color: isDarkMode ? "white" : "black",
            }}
          />
          {product.category && CarCategory[product.category] && (
            <Chip
              icon={CarCategory[product.category].icon}
              label={t(CarCategory[product.category].name)}
              sx={{
                bgcolor: isDarkMode ? "#2d2d2d" : "#e1e1e1",
                color: isDarkMode ? "white" : "black",
              }}
            />
          )}
        </Stack>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: isDarkMode ? "#2c2c2c" : "#ffffff",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={1}>
            {t("overview")}
          </Typography>
          <Typography variant="body1" color={isDarkMode ? "#dcdcdc" : "#444"} sx={{ whiteSpace: "pre-line" }}>
            {product.description}
          </Typography>
        </Paper>

        {product.features && product.features.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: isDarkMode ? "#2c2c2c" : "#ffffff",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              {t("features")}
            </Typography>
            <Grid container spacing={2}>
              {product.features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: isDarkMode ? "#383838" : "#f7f7f7",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight="600" color={isDarkMode ? "white" : "black"}>
                      {feature.name}
                    </Typography>
                    <Typography variant="body2" color={isDarkMode ? "#aaa" : "#555"}>
                      {feature.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {product.colors && product.colors.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: isDarkMode ? "#2c2c2c" : "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              {t("colors")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {product.colors.map((color, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: `2px solid ${color.isAvailable ? "#1976D2" : "#ccc"}`,
                    bgcolor: color.color || (isDarkMode ? "#424242" : "#eee"),
                    color: color.color === "white" ? "black" : "white",
                    opacity: color.isAvailable ? 1 : 0.5,
                    cursor: color.isAvailable ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    fontWeight: 500,
                    textDecoration: color.isAvailable ? "none" : "line-through",
                    boxShadow: color.isAvailable
                      ? "0 2px 10px rgba(0,0,0,0.15)"
                      : "none",
                    "&:hover": {
                      transform: color.isAvailable ? "scale(1.05)" : "none",
                    },
                  }}
                >
                  {color.color}
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Fade>
  );
};

export default ProductDetails;
