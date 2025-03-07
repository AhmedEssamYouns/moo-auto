import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";


export const fakeProductsData = [
  {
    id: "1",
    name: "Tesla Model S",
    model: "Plaid",
    price: "1,200,000",
    fuel: "Electric",
    transmission: "Automatic",
    description:
      "The Tesla Model S Plaid is a high-performance electric vehicle that redefines speed and luxury. With an incredible acceleration of 0-100 km/h in just 1.99 seconds, it offers cutting-edge technology, autopilot features, and an impressive range of over 600 km.",
    images: [
      "https://cricksapi.s3.ap-southeast-2.amazonaws.com/uploads/model_variant/image/6595/2024-jeep-wrangler-sport-s-4door-bright-white.jpg.img.1440__1_.jpg",
      "https://vehicle-images.dealerinspire.com/3e63-110011868/1C4PJXFG7RW272757/db36f6d925c025745b968afa1182612f.jpg",
    ],
  },
];

const ProductScreen = () => {
  const id = "1";
  const product = fakeProductsData.find((item) => item.id === id);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:800px)");
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) {
    console.error("Product not found. Check productsData or the ID:", id);
    return <Typography variant="h5">Product not found</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "center",
        gap: 4,
        mb: 10,
        px: 2,
      }}
    >
      <ProductImages
        product={product}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isMobile={isMobile}
        isDarkMode={isDarkMode}
      />
      <ProductDetails product={product} t={t} isMobile={isMobile} isDarkMode={isDarkMode} />
    </Box>
  );
};

export default ProductScreen;

