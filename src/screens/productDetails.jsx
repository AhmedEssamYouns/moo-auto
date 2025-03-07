import React, { use, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";
import { useCar } from "../services/hooks/useCards";
import { useParams } from "react-router-dom";


const ProductScreen = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:800px)");
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: product } = useCar(id);

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

