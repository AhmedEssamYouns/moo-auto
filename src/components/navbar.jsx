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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import NavDrawer from "./drawer";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
const navItems = [
  { text: "Cars for Sale" },
  { text: "New Arrivals" },
  { text: "Offers & Discounts" },
  { text: "Request a Car" },
  { text: "Financing" },
  { text: "About Us" },
];

{
  /* Desktop Nav Links */
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery("(max-width: 1424px)");

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "0 16px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu Button (Mobile) */}
          {isMobile && !searchOpen && (
            <IconButton
              sx={{ color: "black", mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo (Hidden when search is open) */}
          {!searchOpen && (
            <Typography
              variant="h6"
              sx={{
                width: 180,
                display: "flex",
                fontWeight: "bold",
                color: "black",
                fontFamily: "'Permanent Marker', cursive",
                overflow: "hidden",
              }}
            >
              AL Muslmi
            </Typography>
          )}

          {/* Search Box */}
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
                    bgcolor: "#f0f0f0",
                    px: 2,
                    borderRadius: 2,
                  }}
                >
                  <InputBase placeholder="Search..." fullWidth />
                  <IconButton onClick={() => setSearchOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Slide>
            ) : (
              <InputBase
                placeholder="Search..."
                sx={{
                  bgcolor: "#f0f0f0",
                  px: 2,
                  borderRadius: 2,
                  width: isTablet ? 250 : 550,
                }}
              />
            )}
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.text}
                  variant="body1"
                  sx={{ color: "black" }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}
          {/* Search Icon (Mobile) */}
          {isMobile && !searchOpen && (
            <IconButton
              sx={{ color: "black", transition: "transform 0.3s ease" }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
