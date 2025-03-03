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
  Drawer,
  Button,
  ButtonBase,
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
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleOpenMenu = (event, filter) => {
    if (isMobile) {
      setOpenBottomSheet(true);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedFilter(filter);
    }
  };

  const handleCloseBottomSheet = () => setOpenBottomSheet(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilter("");
  };

  return (
    <Box mb={4}>
      <Box
        sx={{
          pt: 5,
          pb: 4,
          px: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {isMobile && (
          <ButtonBase
            onClick={() => setOpenBottomSheet(true)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: theme.palette.background.default,
              borderRadius: 5,
              px: 2,
              width: "100%",
              maxWidth: 400,
              mb: 4,
              boxShadow: theme.shadows[2],
              textAlign: "left",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenBottomSheet(true);
              }}
            >
              <TuneIcon />
            </IconButton>
          </ButtonBase>
        )}

        {/* Small Header */}
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          Find cars for sale and for rent near you
        </Typography>

        {/* Big Bold Header */}
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: theme.palette.text.primary, mb: 3 }}
        >
          Find Your Dream Car
        </Typography>

        <Drawer
          anchor="bottom"
          open={openBottomSheet}
          onClose={handleCloseBottomSheet}
          PaperProps={{ sx: { borderRadius: "20px 20px 0 0", p: 2 } }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            Filter Options
          </Typography>
          <MenuItem onClick={handleCloseBottomSheet}>Option 1</MenuItem>
          <MenuItem onClick={handleCloseBottomSheet}>Option 2</MenuItem>
          <MenuItem onClick={handleCloseBottomSheet}>Option 3</MenuItem>
          <Button
            onClick={handleCloseBottomSheet}
            fullWidth
            variant="contained"
          >
            Apply Filters
          </Button>
        </Drawer>

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
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
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
                bgcolor: theme.palette.mode === "dark" ? "#444" : "#222",
                color: "white",
                borderRadius: "50%",
                width: 50,
                height: 50,
                ml: 2,
                "&:hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#555" : "#333",
                },
              }}
              onClick={(e) => handleOpenMenu(e, "Filters")}
            >
              <TuneIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Paper>
        )}

        {/* Car SVG */}
        <Box sx={{ width: "80%", maxWidth: 500 }}>
          <CarSVG
            width="100%"
            height="auto"
            fill={theme.palette.text.primary}
          />
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
          justifyContent: "center",
          mt: 4,
          width: "100%",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <InfoCard
          bgColor={theme.palette.mode === "dark" ? "#1E293B" : "#E3F2FD"}
          title="Are you looking for a car?"
          description="We are committed to providing our customers with exceptional service."
          btn={theme.palette.mode === "dark" ? "#60A5FA" : "#1E40AF"}
        />
        <InfoCard
          bgColor={theme.palette.mode === "dark" ? "#3F1D38" : "#FEE2E2"}
          title="Are you looking to sell a car?"
          description="We are committed to providing our customers with exceptional service."
          btn={theme.palette.mode === "dark" ? "#EC4899" : "#9B1C1C"}
        />
      </Box>

      <BestSelling />
    </Box>
  );
};

// Reusable Filter Item Component
const FilterItem = ({ icon, text, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        "&:hover": { color: theme.palette.primary.main },
      }}
      onClick={(e) => onClick(e, text)}
    >
      {icon}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default HomeScreen;
