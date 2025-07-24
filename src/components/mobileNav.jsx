import React, { useState } from "react";
import { Box, IconButton, Slide, InputBase, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import NavDrawer from "./drawer";

const MobileNavbar = ({ darkMode, searchText, setSearchText, onSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 3000,
          top: 0,
          left: 0,
          right: 0,
          px: 2,
          py: 1,
          bgcolor: darkMode ? "black" : "white",
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ color: darkMode ? "white" : "black" }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component={Link}
          to="/"
          sx={{
            fontFamily: "Michroma",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textDecoration: "none",
            color: darkMode ? "white" : "black",
          }}
        >
          Moo Auto
        </Box>

        <IconButton
          onClick={() => setSearchOpen(true)}
          sx={{ color: darkMode ? "white" : "black" }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Slide direction="left" in={searchOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            bgcolor: darkMode ? "#121212" : "#f9f9f9",
            px: 2,
            py: 1,
            backdropFilter: "blur(15px)",
          }}
        >
          <InputBase
            autoFocus
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
                setSearchOpen(false);
              }
            }}
            placeholder="Search..."
            fullWidth
            sx={{
              color: darkMode ? "white" : "black",
              fontSize: "1rem",
              zIndex:99999,
              px: 1,
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

      <NavDrawer
        open={drawerOpen}
        darkMode={darkMode}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;
