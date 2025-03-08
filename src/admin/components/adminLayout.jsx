import React, { useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./sideBar";

const AdminLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar for Mobile */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          {/* Show Menu Icon on Mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6">Admin Panel</Typography>
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
