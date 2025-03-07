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
import logo from "../assets/imgs/logo.png";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

const NavDrawer = ({ open, onClose, darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { t } = useLanguage(); // Get translations

  const navItems = [
    {
      text: t("carsForSale"),
      icon: <DirectionsCarIcon />,
      path: "/cars-for-sale",
    },
    { text: t("newArrivals"), icon: <FiberNewIcon />, path: "/cars-for-sale" },
    // {
    //   text: t("offersDiscounts"),
    //   icon: <LocalOfferIcon />,
    //   path: "/cars-for-sale",
    // },
    { text: t("requestCar"), icon: <CarRentalIcon />, path: "/request-car" },
    // { text: t("financing"), icon: <AccountBalanceIcon />, path: "/financing" },
    { text: t("aboutUs"), icon: <InfoOutlinedIcon />, path: "/about-us" },
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
      <Box
        component={Link}
        to="/"
        sx={{
          width: "90%",
          my: 2,
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Al Muslmi Logo"
          style={{ width: "100%", height: "100%", borderRadius: 45 }}
        />
      </Box>
      <Divider sx={{ backgroundColor: "gray" }} />

      {/* Drawer Items */}
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={onClose}
            sx={{
              textDecoration: "none",
              color: isDarkMode ? "white" : "black",
            }}
          >
            <IconButton sx={{ color: isDarkMode ? "white" : "black", mr: 2 }}>
              {item.icon}
            </IconButton>
            <ListItemText primary={item.text} />
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
