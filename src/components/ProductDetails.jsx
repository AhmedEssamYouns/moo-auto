import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Chip, Button, Paper, Grid } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShareIcon from "@mui/icons-material/Share";
import { baseUrl } from "../utils/baseUrl";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useLanguage } from "../contexts/LanguageContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestoreIcon from "@mui/icons-material/Restore";
const ProductDetails = ({ product, t, isMobile, isDarkMode }) => {
  const shareUrl = `${baseUrl}/cars/Shared/${product.id}`;
  console.log("product", JSON.stringify(product, null, 8));
  const { language } = useLanguage();

  const CarCategory = {
    1: { name: "Sedan", icon: <DirectionsCarFilledIcon /> },
    2: { name: "SUV", icon: <AirportShuttleIcon /> },
    3: { name: "Hatchback", icon: <DirectionsCarFilledIcon /> },
    4: { name: "Coupe", icon: <DirectionsCarFilledIcon /> },
    5: { name: "Convertible", icon: <DirectionsCarFilledIcon /> },
    6: { name: "Truck", icon: <LocalShippingIcon /> },
    7: { name: "Electric", icon: <ElectricCarIcon /> },
    8: { name: "Sports", icon: <SportsMotorsportsIcon /> },
  };


  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: product.name,
          text:
            language == "en"
              ? `Check out this car: ${product.name} - ${product.model} : ${product.description}`
              : `تحقق من هذه السيارة: ${product.name} - ${product.model} : ${product.description}`,
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
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Button
        sx={{
          mb: 2,
          zIndex: isMobile ? 9999 : 1,
          position: "absolute",
          ...(isMobile
            ? { bottom: 8, right: 20, position: "fixed" }
            : { top: 100, right: 100 }),
          borderRadius: isMobile ? "50%" : "10%",
          width: isMobile ? 56 : "150px",
          height: isMobile ? 56 : "auto",
          minWidth: isMobile ? "auto" : "64px",
          p: isMobile ? 1 : "auto",
        }}
        variant="contained"
        color="primary"
        startIcon={!isMobile && <ShareIcon />}
        onClick={handleShare}
      >
        {isMobile ? <ShareIcon /> : t("share")}
      </Button>

      {/* Dynamic Meta Tags */}
      <Helmet>
        <title>{`${product.name} - ${product.model}`}</title>
        <meta
          property="og:title"
          content={`${product.name} - ${product.model}`}
        />
        <meta
          property="og:description"
          content={product.description.substring(0, 150)}
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="product" />
      </Helmet>

      <Typography
        variant="h4"
        width={350}
        fontWeight="bold"
        color={isDarkMode ? "white" : "black"}
        mb={2}
        
      >
        {product.name} - {product.model}
      </Typography>

      <Typography variant="h6" color="#4CAF50" mb={2}>
        {t("price")}: EGP {Number(product.price).toLocaleString()}
      </Typography>
    
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip
          icon={product.status === 1 ? <CheckCircleIcon /> : <RestoreIcon />}
          label={t(product.status == 1 ? "new" : "used")}
          sx={{
            bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
            color: isDarkMode ? "white" : "black",
          }}
        />
        <Chip
          icon={<DirectionsCarIcon />}
          label={t(product.transmission == 2 ? "automatic" : "manual")}
          sx={{
            bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
            color: isDarkMode ? "white" : "black",
          }}
        />
          {product.category && CarCategory[product.category] && (
        <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
          <Chip
            icon={CarCategory[product.category].icon}
            label={t(`${CarCategory[product.category].name}`)}
            sx={{
              bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
              color: isDarkMode ? "white" : "black",
            }}
          />
        </Box>
      )}
      </Box>

      <Box
        sx={{
          maxWidth: "700px",
          mt: 2,
          px: 2,
          py: 2,
          bgcolor: isDarkMode ? "#333" : "#FFF",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {t("overview")}
        </Typography>
        <Typography variant="body1" color={isDarkMode ? "#ddd" : "#333"}sx={{ whiteSpace: "pre-line"}}>
          {product.description}
        </Typography>
      </Box>
      {product.features &&
    product.features.length > 0 && (
      <Paper
      sx={{
        maxWidth: isMobile ? "100%" : "700px",
        mt: 2,
        px: isMobile ? 2 : 3,
        py: 3,
        bgcolor: isDarkMode ? "#333" : "#FFF",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color={isDarkMode ? "white" : "black"}>
        {t("features")}
      </Typography>

      <Grid container spacing={2}>
        {product.features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                bgcolor: isDarkMode ? "#424242" : "#F5F5F5",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold" color={isDarkMode ? "white" : "black"}>
                {feature.name}
              </Typography>
              <Typography variant="body2" color={isDarkMode ? "#BBB" : "#555"}>
                {feature.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
    )
}
      {product.colors && product.colors.length > 0 && (
        <Box
          sx={{
            maxWidth: "700px",
            mt: 2,
            px: 3,
            py: 2,
            bgcolor: isDarkMode ? "#1e1e1e" : "#FFF",
            borderRadius: 2,
            boxShadow: 4,
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
                  bgcolor: color.color || (isDarkMode ? "#424242" : "#E0E0E0"),
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: `2px solid ${color.isAvailable ? "#000" : "#ccc"}`,
                  opacity: color.isAvailable ? 1 : 0.5,
                  textDecoration: color.isAvailable ? "none" : "line-through",
                  cursor: color.isAvailable ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: color.isAvailable
                      ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                      : "none",
                  },
                }}
              >
                {/* <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    bgcolor: color.color,
                    border: "1px solid #000",
                  }}
                /> */}
                <Typography
                  variant="body2"
                  fontWeight="500"
                  sx={{
                    color: color.color == "white" ? "black" : "white",
                  }}
                >
                  {color.color}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
