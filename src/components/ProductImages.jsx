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

  const THUMBNAILS_SHOWN = 6;
  const startIndex = Math.max(0, Math.min(activeIndex - Math.floor(THUMBNAILS_SHOWN / 2), product.images.length - THUMBNAILS_SHOWN));
  const visibleThumbnails = product.images.slice(startIndex, startIndex + THUMBNAILS_SHOWN);

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
      <Box
        sx={{
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          position: "relative",
          bgcolor: isDarkMode ? "#121212" : "#ffffff",
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
                height: "500px",
                objectFit: "cover",
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}
        </SwipeableViews>

        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            zIndex: 1,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            zIndex: 1,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          gap: 1,
        }}
      >
        {product.images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: activeIndex === index ? 24 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: activeIndex === index ? "#1976D2" : "#E0E0E0",
              transition: "all 0.3s ease-in-out",
            }}
          />
        ))}
      </Box>

      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            gap: 1,
            position: "relative",
            maxWidth: "100%",
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "#fff",
              height: 40,
              width: 40,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>

          {visibleThumbnails.map((img, index) => {
            const realIndex = startIndex + index;
            return (
              <Box
                key={realIndex}
                component="img"
                src={img}
                alt={product.name}
                onClick={() => setActiveIndex(realIndex)}
                sx={{
                  width: 80,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer",
                  border: activeIndex === realIndex ? "3px solid #1976D2" : "2px solid transparent",
                  transition: "all 0.3s",
                }}
              />
            );
          })}

          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "#fff",
              height: 40,
              width: 40,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProductImages;
