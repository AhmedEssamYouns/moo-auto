import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeProviderWrapper = ({ children }) => {
  const storedMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedMode);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#121212" : "#f9f9f9",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
          },
        },
        typography: {
          fontFamily: "'Ubuntu', sans-serif",
          h1: { fontFamily: "'Permanent Marker', cursive" },
          h2: { fontFamily: "'Permanent Marker', cursive" },
          h3: { fontFamily: "'Permanent Marker', cursive" },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children(darkMode, setDarkMode)}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
