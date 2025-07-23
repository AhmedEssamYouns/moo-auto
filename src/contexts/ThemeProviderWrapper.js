import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, TextField } from "@mui/material";
import { useLanguage } from "./LanguageContext";
const isAdmin = window.location.hostname.startsWith("dashboard.");

const ThemeProviderWrapper = ({ children }) => {
  const storedMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(
    isAdmin ? false : storedMode ? storedMode === "true" : true
  );
  const { language } = useLanguage();

  useEffect(() => {
    if (!isAdmin) {
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode, isAdmin]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#B30000" : "#B30000",
            contrastText: "#fff",
          },
          secondary: {
            main: darkMode ? "#03DAC6" : "#FF4081",
          },
          error: {
            main: darkMode ? "#CF6679" : "#D32F2F",
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
        components: {
          MuiButton: {
            styleOverrides: {
              outlined: {
                borderColor: darkMode ? "#80CBC4" : "#1976D2",
                color: darkMode ? "white" : "#1976D2",
                "&:hover": {
                  borderColor: darkMode ? "#B2DFDB" : "#1565C0",
                  backgroundColor: darkMode ? "#80CBC4" : "#1976D2",
                  color: "#ffffff",
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                "&:hover": {
                  color: "#B30000",
                  cursor: "pointer",
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-input": {
                  color: darkMode ? "#ffffff" : "#000000",
                },
                "& .MuiFormLabel-root": {
                  color: darkMode ? "#B0BEC5" : "#757575",
                  "&.Mui-focused": {
                    color: darkMode ? "#80CBC4" : "#1976D2",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "#B0BEC5" : "#1976D2",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#80CBC4" : "#1565C0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#80CBC4" : "#1976D2",
                  },
                },
              },
            },
          },
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
