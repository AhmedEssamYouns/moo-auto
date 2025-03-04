import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import ThemeProviderWrapper from "./contexts/ThemeProviderWrapper";
import Navbar from "./components/navbar";
import ScrollToTop from "./utils/scrollToTop";
import ScrollToTopButton from "./components/scrollToTopBtn";
import AppRoutes from "./routes/stack";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
    <ThemeProviderWrapper>
      {(darkMode, setDarkMode) => (
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton darkMode={darkMode} />
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
          <Container sx={{ mt: 4 }}>
            <AppRoutes />
          </Container>
        </BrowserRouter>
      )}
    </ThemeProviderWrapper>
    </LanguageProvider>
  );
};

export default App;
