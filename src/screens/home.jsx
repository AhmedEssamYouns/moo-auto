import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as CarSVG } from "../assets/svgs/home.svg";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import InfoCard from "../components/infoCard";
import BestSelling from "../components/products";

const HomeScreen = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const handleOpenMenu = (event, filter) => {
    setAnchorEl(event.currentTarget);
    setSelectedFilter(filter);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilter("");
  };

  return (
    <Box mb={4}>
      <Box
        sx={{
          pt: 10,
          pb: 4,
          px: 2,
          backgroundColor: "#EEF1FB",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 0 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Small Header */}
        <Typography variant="subtitle1" sx={{ color: "#555", mb: 1 }}>
          Find cars for sale and for rent near you
        </Typography>

        {/* Big Bold Header */}
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#222", mb: 3 }}
        >
          Find Your Dream Car
        </Typography>
        {!isMobile && (
          <Paper
            elevation={4}
            sx={{
              mx: "auto",
              width: "90%",
              my: 4,
              maxWidth: 700,
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
              bgcolor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Filter Items */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                flexGrow: 1,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <FilterItem
                icon={<DirectionsCarIcon />}
                text="Used Cars"
                onClick={handleOpenMenu}
              />
              <FilterItem
                icon={<CategoryIcon />}
                text="Any Make"
                onClick={handleOpenMenu}
              />
              <FilterItem
                icon={<LocalOfferIcon />}
                text="Any Brand"
                onClick={handleOpenMenu}
              />
              <FilterItem
                icon={<AttachMoneyIcon />}
                text="All Prices"
                onClick={handleOpenMenu}
              />
            </Box>

            {/* Menu Button */}
            <IconButton
              sx={{
                bgcolor: "#222",
                color: "white",
                borderRadius: "50%",
                width: 50,
                height: 50,
                ml: 2,
                "&:hover": { bgcolor: "#333" },
              }}
              onClick={(e) => handleOpenMenu(e, "Filters")}
            >
              <TuneIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Paper>
        )}
        {/* Car SVG */}
        <Box sx={{ width: "80%", maxWidth: 500 }}>
          <CarSVG width="100%" height="auto" />
        </Box>

        {/* Menu for Filter Options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>
            Option 1 for {selectedFilter}
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            Option 2 for {selectedFilter}
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            Option 3 for {selectedFilter}
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "center", // Ensures proper centering
          mt: 4,
          width: "100%",
          mx: "auto", // Centers the box horizontally
          textAlign: "center",
        }}
      >
        <InfoCard
          bgColor="#E9F2FF"
          title="Are you looking for a car?"
          description="We are committed to providing our customers with exceptional service."
          btn="#405FF2"
        />
        <InfoCard
          bgColor="#FFE9F3"
          title="Are you looking to sell a car?"
          description="We are committed to providing our customers with exceptional service."
          btn="#050B20"
        />
      </Box>
      <BestSelling />
    </Box>
  );
};

// Reusable Filter Item Component
const FilterItem = ({ icon, text, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        "&:hover": { color: "#1976d2" },
      }}
      onClick={(e) => onClick(e, text)}
    >
      {icon}
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#444" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default HomeScreen;
