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
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NavDrawer from "./drawer";
import { useLanguage } from "../contexts/LanguageContext";
import { useSearch } from "../services/hooks/useCards";
import logo from "../assets/imgs/logo.png";
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { language, setLanguage, t } = useLanguage();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery("(max-width: 1500px)");

  const { data: searchResults, error } = useSearch(searchText);
  const hasResults = searchResults?.items?.length > 0;

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
            <Box component={Link} to="/" sx={{ width: 140,mt: 1, height: "90%" }}>
              <img
                src={logo}
                alt="Al Muslmi Logo"
                style={{ width: "100%", height: "90%", borderRadius: 45 }}
              />
            </Box>
          )}

          <Box sx={{ position: "relative", flexGrow: isMobile ? 1 : 0 }}>
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
                    value={searchText}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsSearchFocused(false), 200)
                    }
                    onChange={(e) => setSearchText(e.target.value)}
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
                value={searchText}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchText(e.target.value)}
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

            {hasResults && isSearchFocused && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  maxHeight: 300,
                  overflowY: "auto",
                  zIndex: 10,
                  bgcolor: darkMode ? "#333" : "white",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <List>
                  {searchResults.items.map((item) => (
                    <ListItem
                      button
                      key={item.id}
                      component={Link}
                      to={`/product/${item.id}`}
                      sx={{
                        "&:hover": { bgcolor: darkMode ? "#444" : "#f0f0f0" },
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={item.brandName}
                        sx={{
                          color: darkMode ? "white" : "black",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {[
                { text: t("carsForSale"), path: "/cars-for-sale" },
                { text: t("newArrivals"), path: "/cars-for-sale" },
                { text: t("requestCar"), path: "/request-car" },
                { text: t("financing"), path: "/financing" },
                { text: t("aboutUs"), path: "/about-us" },
              ].map((item) => (
                <Typography
                  key={item.text}
                  component={Link}
                  to={item.path}
                  variant="body1"
                  sx={{
                    color: darkMode ? "white" : "black",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
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
                "& .MuiSelect-select": { padding: "4px 8px" },
                "& .MuiSelect-icon": { fontSize: "1rem" },
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
