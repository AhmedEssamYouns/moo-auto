import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = ({ darkMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          bgcolor: darkMode ? "#333" : "#f0f0f0",
          color: darkMode ? "white" : "black",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          "&:hover": { bgcolor: darkMode ? "#444" : "#e0e0e0" },
        }}
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ScrollToTopButton;
