import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NavDrawer from "./drawer";
import { useLanguage } from "../contexts/LanguageContext";
import { useSearch } from "../services/hooks/useCards";
import MobileNavbar from "./mobileNav";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery("(max-width: 1500px)");
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useSearch(searchText);
  const hasResults = searchResults?.items?.length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim() && hasResults) {
      setSearchOpen(false);
      setIsSearchFocused(false);
      navigate("/cars-list", {
        state: { cars: searchResults.items, searchText },
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobile)
    return (
      <MobileNavbar
        onSearch={handleKeyDown}
        drawerOpen={drawerOpen}
        searchText={searchText}
        setSearchText={setSearchText}
        onDrawerOpen={() => setDrawerOpen(true)}
      />
    );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled
            ? darkMode
              ? "rgba(18,18,18,0.95)"
              : "rgba(255,255,255,0.95)"
            : darkMode
            ? "rgba(18,18,18,0.95)"
            : "rgba(255,255,255,0.95)",
          boxShadow: "none",
          backdropFilter: scrolled ? "blur(1px)" : "none",
          transition: "all 0.3s ease",
          padding: "0 16px",
          backgroundImage: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {isMobile && !searchOpen && (
              <IconButton
                sx={{ color: darkMode ? "white" : "black", mr: 1 }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!searchOpen && (
              <Box
                component={Link}
                to="/"
                sx={{
                  width: 180,
                  textDecoration: "none",
                  color: darkMode ? "white" : "black",
                  fontFamily: "Michroma",
                  fontWeight: "bold",
                  fontSize: "1.6rem",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: darkMode ? "white" : "black",
                  },
                }}
              >
                Moo Auto
              </Box>
            )}

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 3 }}>
                {[
                  { text: t("carsForSale"), path: "/cars-for-sale" },
                  { text: t("newArrivals"), path: "/new-arrivals" },
                  { text: t("requestCar"), path: "/request-car" },
                  { text: t("financing"), path: "/financing" },
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
                      fontFamily: "Michroma",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.text}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {!isMobile && (
              <InputBase
                value={searchText}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t("searchPlaceholder")}
                sx={{
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  borderRadius: 4,
                  px: 2,
                  width: isTablet ? 250 : 350,
                  color: darkMode ? "white" : "black",
                  py: 1,
                  fontSize: "1rem",
                }}
              />
            )}

            {!searchOpen && !isMobile && (
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

            <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
              <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black" }}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {isMobile && !searchOpen && (
              <IconButton sx={{ color: darkMode ? "white" : "black" }} onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            )}

            {isMobile && (
              <Slide
                direction="left"
                in={searchOpen}
                mountOnEnter
                unmountOnExit
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "150%",
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: 4,
                    px: 2,
                  }}
                >
                  <InputBase
                    onKeyDown={handleKeyDown}
                    value={searchText}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsSearchFocused(false), 200)
                    }
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    fullWidth
                    sx={{
                      color: darkMode ? "white" : "black",
                      py: 1,
                      width: "100%",
                      fontSize: "1rem",
                    }}
                  />
                  <IconButton
                    onClick={() => setSearchOpen(false)}
                    sx={{ color: darkMode ? "white" : "black" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Slide>
            )}

            {isSearchFocused && searchText && !isLoading && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  width: isMobile ? "100vw" : 350,
                  maxHeight: 300,
                  overflowY: "auto",
                  zIndex: 10,
                  bgcolor: darkMode ? "#1e1e1e" : "white",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: "0 0 8px 8px",
                  display: hasResults ? "block" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: hasResults ? 0 : 2,
                }}
              >
                {hasResults ? (
                  <List>
                    {searchResults.items.map((item) => (
                      <ListItem
                        button
                        key={item.id}
                        component={Link}
                        to={`/product/${item.id}`}
                        sx={{
                          "&:hover": {
                            bgcolor: darkMode ? "#2a2a2a" : "#f0f0f0",
                          },
                        }}
                      >
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: 50,
                                marginRight: 10,
                              }}
                            />
                          </Box>
                          <ListItemText
                            primary={item.name}
                            secondary={item.brandName}
                            sx={{ color: darkMode ? "white" : "black" }}
                          />
                          <Typography
                            sx={{
                              color: darkMode ? "white" : "black",
                              fontSize: isMobile ? 12 : 16,
                            }}
                          >
                            {t("Model")} {item.model}
                            <br />
                            {t("EGP")} {item.price}
                          </Typography>
                        </ListItem>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ color: darkMode ? "white" : "black", fontSize: 16 }}>
                    {t("NoCarsFound")}
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
