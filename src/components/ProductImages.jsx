import React from "react";
import { Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

const ProductImages = ({ product, activeIndex, setActiveIndex, isMobile, isDarkMode }) => {
  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 4,
          position: "relative",
          bgcolor: isDarkMode ? "#1E1E1E" : "#f5f5f5",
        }}
      >
        <SwipeableViews index={activeIndex} onChangeIndex={setActiveIndex} enableMouseEvents>
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
                width: activeIndex === index ? 20 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: activeIndex === index ? "#1976D2" : "#BDBDBD",
                transition: "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
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
    </Box>
  );
};

export default ProductImages;
