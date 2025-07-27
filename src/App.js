import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import ThemeProviderWrapper from "./contexts/ThemeProviderWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./utils/scrollToTop";
import ScrollToTopButton from "./components/scrollToTopBtn";
import { LanguageProvider } from "./contexts/LanguageContext";
import LottieComponent from "./components/loader";
import { HelmetProvider } from "react-helmet-async";

// Lazy-loaded components
const Footer = lazy(() => import("./components/fotter"));
const Navbar = lazy(() => import("./components/navbar"));
const AppRoutes = lazy(() => import("./routes/stack"));
const AdminRoutes = lazy(() => import("./admin/routes/adminRouter"));

const queryClient = new QueryClient();

const App = () => {
  const [showLottie, setShowLottie] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const isAdmin = window.location.hostname.startsWith("dashboard.");

  useEffect(() => {
    setTimeout(() => setShowLottie(false), 1000);
  }, []);


  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const LottieFallback = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        width: "100%",
      }}
    >
      <LottieComponent darkMode={darkMode} />
    </Box>
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProviderWrapper darkMode={darkMode}>
            <BrowserRouter>
              {showLottie && !isAdmin ? (
                LottieFallback
              ) : (
                <>
                  <ScrollToTop />
                  <ScrollToTopButton darkMode={darkMode} />
                  {!isAdmin && (
                    <Suspense fallback={LottieFallback}>
                      <Navbar
                        darkMode={darkMode}
                        toggleDarkMode={() => setDarkMode((prev) => !prev)}
                      />
                    </Suspense>
                  )}
                  <Suspense fallback={LottieFallback}>
                    {isAdmin ? (
                      <AdminRoutes />
                    ) : (
                      <AppRoutes darkMode={darkMode} />
                    )}
                  </Suspense>
                  {!isAdmin && (
                    <Suspense fallback={LottieFallback}>
                      <Footer darkMode={darkMode} />
                    </Suspense>
                  )}
                </>
              )}
            </BrowserRouter>
          </ThemeProviderWrapper>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
