import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../assets/imgs/logo.png";

const sidebarItems = [
  { text: "Modify Cars", path: "/admin/cars", icon: <DirectionsCarIcon /> },
  { text: "Modify Brands", path: "/admin/brands", icon: <BrandingWatermarkIcon /> },
  { text: "Modify Admins", path: "/admin/users", icon: <AdminPanelSettingsIcon /> },
  { text: "View Requests", path: "/admin/requests", icon: <AssignmentIcon /> },
  { text: "Installment Plans", path: "/admin/installments", icon: <PaymentIcon /> },
];

const Sidebar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const user = JSON.parse(localStorage.getItem("user"));

  const isOwner = user?.roles.includes("Owner");
  const filteredSidebarItems = sidebarItems.filter(
    (item) => item.text !== "Modify Admins" || isOwner
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={toggleDrawer}
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: isMobile ? "none" : "2px 0 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Box>
        {/* Logo */}
        <Toolbar sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <img src={logo} alt="Admin Logo" style={{ width: 130, height: "auto" }} />
        </Toolbar>

        {/* Sidebar Items */}
        <List>
          {filteredSidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                padding: "12px 20px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ fontWeight: "bold", color: "#000" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <ListItem
        button
        onClick={handleLogout}
        sx={{
          padding: "12px 20px",
          "&:hover": { backgroundColor: "#ffe6e6" },
        }}
      >
        <ListItemIcon sx={{ color: "#000" }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          sx={{ fontWeight: "bold", color: "#000" }}
        />
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
