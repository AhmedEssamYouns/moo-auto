import React from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";

const ProductImages = ({ product, activeIndex, setActiveIndex, isMobile, isDarkMode }) => {
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Main Image Slider */}
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

        {/* Left Arrow Button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* Right Arrow Button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Dots Indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
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

      {/* Thumbnail Images */}
      {!isMobile && (
        
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
      )}

    </Box>
  );
};

export default ProductImages;
