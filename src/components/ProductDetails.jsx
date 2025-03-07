import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Chip, Button } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShareIcon from "@mui/icons-material/Share";

const ProductDetails = ({ product, t, isMobile, isDarkMode }) => {
  const shareUrl = `${window.location.origin}/product/${product.id}`;
  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: product.name,
          text: `${shareUrl}`,
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
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Button
        sx={{
          mb: 2,
          position: "absolute",
          ...(isMobile
            ? { bottom: 8, right: 20, position: "fixed" } // Floating at bottom-right on mobile
            : { top: 100, right: 100 }), // Default for larger screens
          zIndex: 1000, // Ensure it's above other elements
          borderRadius: "50%", // Optional: Make it circular on mobile
          width: isMobile ? 56 : "auto", // Adjust size for mobile
          height: isMobile ? 56 : "auto",
          minWidth: isMobile ? "auto" : "64px",
          p: isMobile ? 1 : "auto",
        }}
        variant="contained"
        color="primary"
        startIcon={!isMobile && <ShareIcon />} // Hide icon on mobile for circular button
        onClick={handleShare}
      >
        {isMobile ? <ShareIcon /> : "Share"}
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
        fontWeight="bold"
        color={isDarkMode ? "white" : "black"}
        mb={2}
      >
        {product.name} - {product.model}
      </Typography>

      <Typography variant="h6" color="#4CAF50" mb={2}>
        Price: EGP {product.price}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip
          icon={<LocalGasStationIcon />}
          label={t(`${product.fuel}`)}
          sx={{
            bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
            color: isDarkMode ? "white" : "black",
          }}
        />
        <Chip
          icon={<DirectionsCarIcon />}
          label={t(`${product.transmission}`)}
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
          Overview
        </Typography>
        <Typography variant="body1" color={isDarkMode ? "#ddd" : "#333"}>
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
