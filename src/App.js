import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ThemeProviderWrapper from "./contexts/ThemeProviderWrapper";
import Navbar from "./components/navbar";
import ScrollToTop from "./utils/scrollToTop";
import ScrollToTopButton from "./components/scrollToTopBtn";
import AppRoutes from "./routes/stack";
import { LanguageProvider } from "./contexts/LanguageContext";
import LottieComponent from "./components/loader";
import Footer from "./components/fotter";

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showLottie, setShowLottie] = useState(true); // State to control Lottie animation visibility

  useEffect(() => {
    // Wait for fonts to load
    document.fonts.ready.then(() => setFontsLoaded(true));

    // Show Lottie animation for 1 second and then hide it
    setTimeout(() => {
      setShowLottie(false); // Hide Lottie animation after 1 second
    }, 2000); // 1000 milliseconds (1 second)
  }, []);

  if (!fontsLoaded) return null; // Wait until fonts are fully loaded

  return (
    <LanguageProvider>
      <ThemeProviderWrapper>
        {(darkMode, setDarkMode) => (
          <BrowserRouter>
            {/* Show Lottie animation for 1 second */}
            {showLottie ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",// Adjust this value as needed
                  width: "100%", // Make sure it spans full width
                }}
              >
                <LottieComponent />
              </Box>
            ) : (
              <>
                <ScrollToTop />
                <ScrollToTopButton darkMode={darkMode} />
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <Container sx={{ mt: 4 }}>
                  <AppRoutes />
                </Container>
                <Footer darkMode={darkMode} />
              </>
            )}
          </BrowserRouter>
        )}
      </ThemeProviderWrapper>
    </LanguageProvider>
  );
};

export default App;
