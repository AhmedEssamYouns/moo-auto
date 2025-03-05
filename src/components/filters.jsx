import React, { useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Menu,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  Typography,
  ButtonBase,
  Popover,
  Slider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import { useLanguage } from "../contexts/LanguageContext";
import MobileDrawerFilters from "./mobileFilter";

const Filters = ({ onApplyFilters, allBrands }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);

  // Filter states
  const [selectedPrice, setSelectedPrice] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState("manual");
  const [usedCars, setUsedCars] = useState(false);

  // Handle opening and closing of menus
  const handleOpenMenu = (event, filter) => {
    setAnchorEl(event.currentTarget);
    setSelectedFilter(filter);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilter("");
  };

  const handleSelectFilter = (filter, value) => {
    if (filter === "transmission") setSelectedTransmission(value);
    if (filter === "brand") setSelectedBrand(value);
    if (filter === "usedCars") setUsedCars(!usedCars);
    handleCloseMenu();
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      selectedPrice,
      selectedBrand,
      selectedTransmission,
      usedCars,
    });
    setOpenBottomSheet(false);
  };

  // Open price range dialog
  const handlePriceRangeClick = () => setOpenPriceDialog(true);
  const handlePriceRangeClose = () => setOpenPriceDialog(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle brand selection from the search
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setOpenDialog(false); // Close the dialog when a brand is selected
  };

  

  // Filter brands based on search query
  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {/* Desktop View */}
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
              text={usedCars ? t("newCars") : t("usedCars")}
              onClick={() => handleSelectFilter("usedCars")}
            />
            <FilterItem
              icon={<CategoryIcon />}
              text={t("allBrands")}
              onClick={(e) => handleOpenMenu(e, "brands")}
            />
            <FilterItem
              icon={<LocalOfferIcon />}
              text={t("allPrices")}
              onClick={handlePriceRangeClick}
            />
            <FilterItem
              icon={<AttachMoneyIcon />}
              text={t(
                selectedTransmission === "manual" ? "manual" : "automatic"
              )}
              onClick={(e) => handleOpenMenu(e, "transmission")}
            />
          </Box>

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
            onClick={(e) => handleOpenMenu(e, t("filters"))}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Paper>
      )}

      {/* Mobile View */}
      {isMobile && (
        <ButtonBase
          onClick={() => setOpenBottomSheet(true)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            my: 4,
            borderRadius: 20,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("filters")}
          </Typography>

          <IconButton
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#444" : "#222",
              color: "white",
              borderRadius: "50%",
              width: 50,
              height: 50,
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#555" : "#333",
              },
            }}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </ButtonBase>
      )}

      <MobileDrawerFilters
        openBottomSheet={openBottomSheet}
        setOpenBottomSheet={setOpenBottomSheet}
        allBrands={allBrands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        handleSelectFilter={handleSelectFilter}
        handlePriceRangeClick={handlePriceRangeClick}
        handleApplyFilters={handleApplyFilters}
      />

      {/* Menu for Filter Options (Desktop) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {selectedFilter === "transmission" && (
          <>
            <MenuItem
              onClick={() => handleSelectFilter("transmission", "manual")}
            >
              {t("manual")}
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectFilter("transmission", "automatic")}
            >
              {t("automatic")}
            </MenuItem>
          </>
        )}
        {selectedFilter === "brands" &&
          allBrands.map((brand, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSelectFilter("brand", brand)}
            >
              {brand}
            </MenuItem>
          ))}
      </Menu>
    </>
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
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{text}</Typography>
    </Box>
  );
};

export default Filters;
