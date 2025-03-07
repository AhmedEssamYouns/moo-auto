import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Chip, Button } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShareIcon from "@mui/icons-material/Share";

const ProductDetails = ({ product, t, isMobile, isDarkMode }) => {
  const shareUrl = `${window.location.origin}/product/${product.id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `${product.name} - ${product.model}\n${product.description.substring(0, 100)}...\n${shareUrl}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Box sx={{ width: isMobile ? "100%" : "50%", textAlign: isMobile ? "center" : "left" }}>
      {/* Dynamic Meta Tags */}
      <Helmet>
        <title>{`${product.name} - ${product.model}`}</title>
        <meta property="og:title" content={`${product.name} - ${product.model}`} />
        <meta property="og:description" content={product.description.substring(0, 150)} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="product" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${product.model}`} />
        <meta name="twitter:description" content={product.description.substring(0, 150)} />
        <meta name="twitter:image" content={product.image} />
      </Helmet>

      <Typography variant="h4" fontWeight="bold" color={isDarkMode ? "white" : "black"} mb={2}>
        {product.name} - {product.model}
      </Typography>

      <Typography variant="h6" color="#4CAF50" mb={2}>
        Price: EGP {product.price}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip icon={<LocalGasStationIcon />} label={t(`${product.fuel}`)} sx={{ bgcolor: isDarkMode ? "#424242" : "#E0E0E0", color: isDarkMode ? "white" : "black" }} />
        <Chip icon={<DirectionsCarIcon />} label={t(`${product.transmission}`)} sx={{ bgcolor: isDarkMode ? "#424242" : "#E0E0E0", color: isDarkMode ? "white" : "black" }} />
      </Box>

      <Button variant="contained" color="primary" startIcon={<ShareIcon />} onClick={handleShare}>
        Share
      </Button>

      <Box sx={{ maxWidth: "700px", mt: 2, px: 2, py: 2, bgcolor: isDarkMode ? "#333" : "#FFF", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight="bold">Overview</Typography>
        <Typography variant="body1" color={isDarkMode ? "#ddd" : "#333"}>{product.description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
