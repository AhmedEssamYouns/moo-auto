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
  Select,
  MenuItem,
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
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    {
      text: t("carsForSale"),
      icon: <DirectionsCarIcon />,
      path: "/cars-for-sale",
    },
    { text: t("newArrivals"), icon: <FiberNewIcon />, path: "/new-arrivals" },
    // {
    //   text: t("offersDiscounts"),
    //   icon: <LocalOfferIcon />,
    //   path: "/cars-for-sale",
    // },
    { text: t("requestCar"), icon: <CarRentalIcon />, path: "/request-car" },
    { text: t("financing"), icon: <AccountBalanceIcon />, path: "/financing" },
    // { text: t("aboutUs"), icon: <InfoOutlinedIcon />, path: "/about-us" },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 250,
          zIndex: 9999,
          backgroundColor: isDarkMode ? "black" : "white",
          color: isDarkMode ? "white" : "black",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          backgroundImage: "none",
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
          
          alt="Moo Auto Logo"
          style={{
            resize:"contain",
            width: "100%",
            height: "60%",
            borderRadius: 45,
            marginTop: 100,
          }}
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
      <Divider sx={{ mx: 2, mt: 1 }} />

      <Box sx={{ px: 3, mt: 2, mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {t("language")}
        </Typography>
        <Select
          fullWidth
          size="small"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{
            bgcolor: isDarkMode ? "#333" : "#f5f5f5",
            color: isDarkMode ? "#fff" : "#000",
            fontSize: "0.9rem",
            borderRadius: 1,
            "& .MuiSelect-icon": { color: isDarkMode ? "#fff" : "#000" },
          }}
        >
          <MenuItem value="en">{t("english")}</MenuItem>
          <MenuItem value="ar">{t("arabic")}</MenuItem>
        </Select>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
