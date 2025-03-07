import React, { useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useLanguage } from "../contexts/LanguageContext";

// Fake Product Data
const fakeProductsData = [
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
  {
    id: "2",
    name: "BMW M3",
    model: "Competition",
    price: "850,000",
    fuel: "Petrol",
    transmission: "Manual",
    description:
      "The BMW M3 Competition is a true driver's car, combining power and precision. With a turbocharged inline-six engine producing 503 horsepower, it delivers a thrilling ride with responsive handling, luxurious interiors, and the latest M performance technology.",
    images: [
      "https://source.unsplash.com/600x400/?bmw",
      "https://source.unsplash.com/600x400/?m3",
    ],
  },
];

const ProductScreen = () => {
  const id = "1";
  const product = fakeProductsData.find((item) => item.id === id);
  const theme = useTheme();
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
        minHeight: "100vh",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDarkMode ? "#121212" : "#f5f5f5",
      }}
    >
      <Typography
        variant="h4"
        my={2}
        mb={5}
        fontWeight="bold"
        color={isDarkMode ? "white" : "black"}
      >
        {product.name} - {product.model}
      </Typography>
      {/* Product Image Slider */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "700px",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 4,
          position: "relative",
        }}
      >
        <SwipeableViews
          index={activeIndex}
          onChangeIndex={(index) => setActiveIndex(index)}
          enableMouseEvents
        >
          {product.images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={product.name}
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          ))}
        </SwipeableViews>

        {/* Image Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {product.images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index ? 20 : 10, // Expand active one
                height: 10,
                borderRadius: 5,
                backgroundColor: activeIndex === index ? "#1976D2" : "#BDBDBD",
                transition:
                  "width 0.3s ease-in-out, background-color 0.3s ease-in-out", // Smooth transition
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: 1,
        }}
      >
        {product.images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={product.name}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 80,
              height: 60,
              objectFit: "cover",
              borderRadius: 1,
              cursor: "pointer",
              border: activeIndex === index ? "2px solid #1976D2" : "none",
              transition: "border 0.3s",
            }}
          />
        ))}
      </Box>

      {/* Product Details */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h6" color="#4CAF50" mt={1}>
          Price: EGP {product.price}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
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

        {/* Description */}
        <Box
          sx={{
            maxWidth: "700px",
            textAlign: "left",
            mt: 3,
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
    </Box>
  );
};

export default ProductScreen;
