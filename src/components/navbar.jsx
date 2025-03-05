import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Slide,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NavDrawer from "./drawer";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery("(max-width: 1500px)");

  const navItems = [
    { text: t("carsForSale"), path: "/cars-for-sale" },
    { text: t("newArrivals"), path: "/new-arrivals" },
    { text: t("offersDiscounts"), path: "/offers-discounts" },
    { text: t("requestCar"), path: "/request-car" },
    { text: t("financing"), path: "/financing" },
    { text: t("aboutUs"), path: "/about-us" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: darkMode ? "#121212" : "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "0 16px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile && !searchOpen && (
            <IconButton
              sx={{ color: darkMode ? "white" : "black", mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!searchOpen && (
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                width: 150,
                fontWeight: "bold",
                color: darkMode ? "white" : "black",
                fontFamily: "'Permanent Marker', cursive",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              Al Muslmi
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            {isMobile ? (
              <Slide
                direction="left"
                in={searchOpen}
                mountOnEnter
                unmountOnExit
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    bgcolor: darkMode ? "#333" : "#f0f0f0",
                    px: 2,
                    borderRadius: 2,
                  }}
                >
                  <InputBase
                    placeholder={t("searchPlaceholder")}
                    fullWidth
                    sx={{ color: darkMode ? "white" : "black" }}
                  />
                  <IconButton
                    onClick={() => setSearchOpen(false)}
                    sx={{ color: darkMode ? "white" : "black" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Slide>
            ) : (
              <InputBase
                placeholder={t("searchPlaceholder")}
                sx={{
                  bgcolor: darkMode ? "#333" : "#f0f0f0",
                  px: 2,
                  borderRadius: 2,
                  width: isTablet ? 250 : 550,
                  color: darkMode ? "white" : "black",
                }}
              />
            )}
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.text}
                  component={Link}
                  to={item.path}
                  variant="body1"
                  sx={{
                    color: darkMode ? "white" : "black",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline", 
                    },
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}

          {!searchOpen && !isMobile && (
            <IconButton
              sx={{ color: darkMode ? "white" : "black" }}
              onClick={toggleDarkMode}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          )}

          {isMobile && !searchOpen && (
            <IconButton
              sx={{ color: darkMode ? "white" : "black" }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          )}

          {!searchOpen && (
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                mx: 1,
                bgcolor: darkMode ? "#333" : "#f0f0f0",
                color: darkMode ? "white" : "black",
                borderRadius: 1,
                fontSize: "0.85rem",
                minWidth: 90,
                height: 32,
                "& .MuiSelect-select": {
                  padding: "4px 8px",
                },
                "& .MuiSelect-icon": {
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                },
              }}
            >
              <MenuItem value="en">{t("english")}</MenuItem>
              <MenuItem value="ar">{t("arabic")}</MenuItem>
            </Select>
          )}
        </Toolbar>
      </AppBar>

      <NavDrawer
        open={drawerOpen}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
