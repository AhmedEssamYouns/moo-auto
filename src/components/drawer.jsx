import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  IconButton,
  Typography,
  Switch,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";

const NavDrawer = ({ open, onClose, darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage(); // Get translations

  const navItems = [
    { text: t("carsForSale"), icon: <DirectionsCarIcon /> },
    { text: t("newArrivals"), icon: <FiberNewIcon /> },
    { text: t("offersDiscounts"), icon: <LocalOfferIcon /> },
    { text: t("requestCar"), icon: <CarRentalIcon /> },
    { text: t("financing"), icon: <AccountBalanceIcon /> },
    { text: t("aboutUs"), icon: <InfoOutlinedIcon /> },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: isDarkMode ? "#424242" : "white",
          color: isDarkMode ? "white" : "black",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}
    >
      {/* Drawer Header */}
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? "white" : "black",
            fontFamily: "'Permanent Marker', cursive",
          }}
        >
          Al Muslmi
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'gray'}} />

      {/* Drawer Items */}
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} onClick={onClose}>
            <IconButton sx={{ color: isDarkMode ? "white" : "black", mr: 2 }}>
              {item.icon}
            </IconButton>
            <ListItemText
              primary={item.text}
              sx={{ color: isDarkMode ? "white" : "black" }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: isDarkMode ? "gray" : "black", my: 1 }} />

      {/* Dark Mode Toggle */}
      <ListItem>
        <IconButton sx={{ color: isDarkMode ? "white" : "black", mr: 2 }}>
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <ListItemText
          primary={
            theme.palette.mode === "dark" ? t("lightMode") : t("darkMode")
          }
          sx={{ color: isDarkMode ? "white" : "black" }}
        />
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </ListItem>
    </Drawer>
  );
};

export default NavDrawer;
