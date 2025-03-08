import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import logo from "../../assets/imgs/logo.png";

const sidebarItems = [
  { text: "Modify Cars", path: "/admin/cars", icon: <DirectionsCarIcon /> },
  { text: "Modify Brands", path: "/admin/brands", icon: <BrandingWatermarkIcon /> },
  { text: "Modify Admins", path: "/admin/admins", icon: <AdminPanelSettingsIcon /> },
  { text: "View Requests", path: "/admin/requests", icon: <AssignmentIcon /> },
  { text: "Installment Plans", path: "/admin/installments", icon: <PaymentIcon /> },
];

const Sidebar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={toggleDrawer}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          boxShadow: isMobile ? "none" : "2px 0 5px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <img src={logo} alt="Admin Logo" style={{ width: 120, height: "auto" }} />
      </Toolbar>

      <List>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
