import React, { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useLanguage } from "./LanguageContext";

const ThemeProviderWrapper = ({ children }) => {
  const { language } = useLanguage();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
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
            default: "#f9f9f9",
            paper: "#ffffff",
          },
          text: {
            primary: "#000000",
            secondary: "#757575",
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
                borderColor: "#1976D2",
                color: "#1976D2",
                "&:hover": {
                  borderColor: "#1565C0",
                  backgroundColor: "#1976D2",
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
                  color: "#000000", // input text
                },
                "& .MuiFormLabel-root": {
                  color: "#757575", // label
                  "&.Mui-focused": {
                    color: "#1976D2", // label when focused
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976D2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1565C0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976D2",
                  },
                },
              },
            },
          },
        },
      }),
    [language]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children()}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
