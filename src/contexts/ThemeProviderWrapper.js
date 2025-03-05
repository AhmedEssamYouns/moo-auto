import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useLanguage } from "./LanguageContext";

const ThemeProviderWrapper = ({ children }) => {
  const storedMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedMode);
  const { language } = useLanguage(); // Get the selected language from context

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#1E293B" : "#1976D2", // Deep purple for dark, rich blue for light
            contrastText: "#fff",
          },
          secondary: {
            main: darkMode ? "#03DAC6" : "#FF4081", // Teal in dark mode, Pink in light mode
          },
          error: {
            main: darkMode ? "#CF6679" : "#D32F2F", // Soft red for dark mode
          },
          warning: {
            main: darkMode ? "#FBC02D" : "#FFA000",
          },
          info: {
            main: darkMode ? "#03A9F4" : "#0288D1",
          },
          success: {
            main: darkMode ? "#4CAF50" : "#2E7D32",
          },
          background: {
            default: darkMode ? "#121212" : "#f9f9f9",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
            secondary: darkMode ? "#B0BEC5" : "#757575", // Better contrast
          },
        },
        typography: {
          fontFamily: "'Ubuntu', 'IBM Plex Sans Arabic', sans-serif",
          h1: { fontFamily: "'Permanent Marker', cursive" },
          h2: { fontFamily: "'Permanent Marker', cursive" },
          h3: {
            fontFamily:
              language === "ar"
                ? "'Ubuntu', sans-serif"
                : "'IBM Plex Sans Arabic', sans-serif",
          },
          body1: { fontFamily: "'IBM Plex Sans Arabic', sans-serif" },
          body2: { fontFamily: "'IBM Plex Sans Arabic', sans-serif" },
        },
      }),
    [darkMode, language]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children(darkMode, setDarkMode)}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
