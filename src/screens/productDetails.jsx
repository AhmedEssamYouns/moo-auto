import React, { use, useState } from "react";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
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
  const { data: product ,isLoading} = useCar(id);
  if (isLoading) {
    return <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}><CircularProgress color="primary" size={50} thickness={4} /></Box>;
  }
  if (!product) {
    console.error("Product not found. Check productsData or the ID:", id);
    return <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}><Typography variant="h5">Product not found</Typography></Box>;
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

