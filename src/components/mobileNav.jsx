import React, { useState, lazy, Suspense, useCallback, useEffect, useRef } from "react";
import { Box, IconButton, Slide, InputBase, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

// ⬇️ lazy-load the drawer chunk
const NavDrawer = lazy(() => import("./drawer"));

const MobileNavbar = ({ darkMode, searchText, setSearchText, onSearch, toggleDarkMode }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prefetched, setPrefetched] = useState(false);
  const idleId = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Prefetch drawer on intent (hover/focus/touch) or idle
  const prefetchDrawer = useCallback(() => {
    if (prefetched) return;
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => setTimeout(cb, 200);
    idleId.current = idle(() => {
      import("./drawer").then(() => setPrefetched(true));
    });
  }, [prefetched]);

  useEffect(() => {
    // also prefetch on idle shortly after mount
    prefetchDrawer();
    return () => {
      if (!idleId.current) return;
      const cancel = "cancelIdleCallback" in window ? window.cancelIdleCallback : clearTimeout;
      cancel(idleId.current);
    };
  }, [prefetchDrawer]);

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
          top: 0, left: 0, right: 0,
          px: 2, py: 1,
          bgcolor: isDark ? "#121212" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${isDark ? "#333" : "#ddd"}`,
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(true)}
          onMouseEnter={prefetchDrawer}
          onFocus={prefetchDrawer}
          onTouchStart={prefetchDrawer}
          sx={{ color: isDark ? "#fff" : "#000" }}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>

        <Box
          component={Link}
          to="/"
          sx={{
            fontFamily: "Michroma, system-ui, sans-serif",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textDecoration: "none",
            color: isDark ? "#fff" : "#000",
            height: 40, lineHeight: "40px", display: "block" // reserve space; avoids CLS
          }}
        >
          Moo Auto
        </Box>

        <IconButton
          onClick={() => setSearchOpen(true)}
          sx={{ color: isDark ? "#fff" : "#000" }}
          aria-label="Open search"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Slide direction="left" in={searchOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            bgcolor: isDark ? "#1e1e1e" : "#f9f9f9",
            px: 2, py: 1,
            backdropFilter: "blur(15px)",
            borderBottom: `1px solid ${isDark ? "#444" : "#ccc"}`,
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
            sx={{ color: isDark ? "#fff" : "#000", fontSize: "1rem", px: 1 }}
          />
          <IconButton onClick={() => setSearchOpen(false)} sx={{ color: isDark ? "#fff" : "#000" }} aria-label="Close search">
            <CloseIcon />
          </IconButton>
        </Box>
      </Slide>

      {/* ⬇️ render the drawer ONLY when open; keep fallback tiny */}
      <Suspense fallback={null}>
        {drawerOpen && (
          <NavDrawer
            open={drawerOpen}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
};

export default MobileNavbar;
