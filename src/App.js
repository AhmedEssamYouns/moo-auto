import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ThemeProviderWrapper from "./contexts/ThemeProviderWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./utils/scrollToTop";
import ScrollToTopButton from "./components/scrollToTopBtn";
import AppRoutes from "./routes/stack";
import { LanguageProvider } from "./contexts/LanguageContext";
import LottieComponent from "./components/loader";
import Footer from "./components/fotter";
import { HelmetProvider } from "react-helmet-async";
import AdminRoutes from "./admin/routes/adminRouter";
import Navbar from './components/navbar';
const queryClient = new QueryClient();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  // Check if the current subdomain is "admin"
  const isAdmin = window.location.hostname.startsWith("admin.");

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));

    setTimeout(() => {
      setShowLottie(false);
    }, 2000);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProviderWrapper>
            {(darkMode, setDarkMode) => (
              <BrowserRouter>
                {showLottie && !isAdmin ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      width: "100%",
                    }}
                  >
                    <LottieComponent />
                  </Box>
                ) : (
                  <>
                    <ScrollToTop />
                    <ScrollToTopButton darkMode={darkMode} />
                    {!isAdmin && (
                      <Navbar
                        darkMode={darkMode}
                        toggleDarkMode={() => setDarkMode((prev) => !prev)}
                      />
                    )}
                    <Container sx={{ mt: 4 }}>
                      {isAdmin ? <AdminRoutes /> : <AppRoutes />}
                    </Container>
                    {!isAdmin && <Footer darkMode={darkMode} />}
                  </>
                )}
              </BrowserRouter>
            )}
          </ThemeProviderWrapper>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
