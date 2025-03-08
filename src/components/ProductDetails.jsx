import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Chip, Button } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShareIcon from "@mui/icons-material/Share";
import { baseUrl } from "../utils/baseUrl";
import { useLanguage } from "../contexts/LanguageContext";

const ProductDetails = ({ product, t, isMobile, isDarkMode }) => {
  const shareUrl = `${baseUrl}/cars/Shared/${product.id}`;
const {language}=useLanguage()
  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: product.name,
          text: language == "en" ? `Check out this car: ${product.name} - ${product.model} : ${product.description}` : `تحقق من هذه السيارة: ${product.name} - ${product.model} : ${product.description}`,
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
          borderRadius:  isMobile ? "50%" : "10%",
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
        <meta property="og:title" content={`${product.name} - ${product.model}`} />
        <meta property="og:description" content={product.description.substring(0, 150)} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="product" />
      </Helmet>

      <Typography
        variant="h4"
        fontWeight="bold"
        color={isDarkMode ? "white" : "black"}
        mb={2}
      >
        {product.name} - {product.model}
      </Typography>

      <Typography variant="h6" color="#4CAF50" mb={2}>
        {t("price")}: EGP {product.price}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip
          icon={<LocalGasStationIcon />}
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
        <Typography variant="body1" color={isDarkMode ? "#ddd" : "#333"}>
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
