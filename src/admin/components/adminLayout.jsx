import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "./sideBar";
import logo from "../../assets/imgs/logo.png";

const AdminLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "#fff", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: 2 }}>
          {/* Menu Icon for Mobile */}
          {isMobile && (
            <IconButton color="primary" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 50, objectFit: "contain" }}
            />
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", color: "#333", fontWeight: "bold" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
            </Typography>
          </Box>

          {/* User Info */}
          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: "#333" }}>
                {user.userName}
              </Typography>
              <IconButton color="primary" onClick={handleMenuOpen}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem disabled sx={{ fontWeight: 500 }}>{user.email}</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
