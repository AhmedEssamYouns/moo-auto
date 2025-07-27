// ThemeProviderWrapper.jsx or .tsx
import React, { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useLanguage } from "./LanguageContext";

const ThemeProviderWrapper = ({ children, darkMode }) => {
  const { language } = useLanguage();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#B30000",
            contrastText: "#fff",
          },
          secondary: {
            main: "#FF4081",
          },
          error: {
            main: "#D32F2F",
          },
          warning: {
            main: "#FFA000",
          },
          info: {
            main: "#0288D1",
          },
          success: {
            main: "#2E7D32",
          },
          background: {
            default: darkMode ? "#121212" : "#f9f9f9",
            paper: darkMode ? "#1E1E1E" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
            secondary: darkMode ? "#B0BEC5" : "#757575",
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
    [language, darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
