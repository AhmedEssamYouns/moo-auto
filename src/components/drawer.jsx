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
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NavDrawer = ({ open, onClose }) => {
  const navItems = [
    { text: "Cars for Sale", icon: <DirectionsCarIcon /> },
    { text: "New Arrivals", icon: <FiberNewIcon /> },
    { text: "Offers & Discounts", icon: <LocalOfferIcon /> },
    { text: "Request a Car", icon: <CarRentalIcon /> },
    { text: "Financing", icon: <AccountBalanceIcon /> },
    { text: "About Us", icon: <InfoOutlinedIcon /> },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: "white",
          color: "black",
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
            color: "black",
            fontFamily: "'Permanent Marker', cursive",
          }}
        >
          AL Muslmi Group
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "white" }} />

      {/* Drawer Items */}
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} onClick={onClose}>
            <IconButton sx={{ color: "black", mr: 2 }}>{item.icon}</IconButton>
            <ListItemText primary={item.text} sx={{ color: "black" }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
