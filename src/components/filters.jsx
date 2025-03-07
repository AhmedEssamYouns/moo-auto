import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  IconButton,
  Icon,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add"; // Add icon for the button
import { useLanguage } from "../contexts/LanguageContext";
import PriceRangeDialog from "./PriceRangeDialog";
import BrandSelectionDialog from "./BrandSelectionDialog";
import MobileDrawerFilters from "./mobileFilter";
import FilterItem from "./FilterItem"; // Filter Item Component
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TransmissionIcon from "@mui/icons-material/Transform";

const Filters = ({ onApplyFilters, brandsData }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState("manual");
  const [usedCars, setUsedCars] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const allBrands = brandsData?.map((brand) => brand.name) || [];

  // State for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFilter = (filter, value) => {
    if (filter === "transmission") setSelectedTransmission(value);
    if (filter === "brand") {
      const selectedBrandObj = brandsData.find((brand) => brand.name === value);
      setSelectedBrand(selectedBrandObj ? selectedBrandObj.id : null);
    }
    if (filter === "usedCars") setUsedCars(!usedCars);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      MinPrice: minPrice,
      MaxPrice: maxPrice,
      CarBrand: brandsData.find((brand) => brand.name === selectedBrand).id,
      // TransmissionType: selectedTransmission,
      // CarState: usedCars ? "used" : "new",
    });

    setOpenBottomSheet(false);
  };

  // Handle menu open
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  // Handle menu item selection
  const handleMenuClose = (value) => {
    setSelectedTransmission(value);
    setOpenMenu(false);
  };

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
              onClick={() => setOpenDialog(true)}
            />
            <FilterItem
              icon={<LocalOfferIcon />}
              text={t("allPrices")}
              onClick={() => setOpenPriceDialog(true)}
            />

            <FilterItem
              icon={<TransmissionIcon />}
              text={t(
                selectedTransmission === "manual" ? "manual" : "automatic"
              )}
              onClick={handleMenuClick} // Open menu on click
            />
          </Box>

          <Icon
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </Icon>
        </Paper>
      )}

      {/* Mobile View */}
      {isMobile && (
        <>
          <MobileDrawerFilters
            setOpenPriceDialog={setOpenPriceDialog}
            openBottomSheet={openBottomSheet}
            setOpenBottomSheet={setOpenBottomSheet}
            allBrands={allBrands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            handleSelectFilter={handleSelectFilter}
            handleApplyFilters={handleApplyFilters}
          />

          {/* Floating Button to Open Bottom Sheet */}
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={() => setOpenBottomSheet(true)}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                borderRadius: "50%",
                boxShadow: 3,
                padding: 2,
              }}
            >
              <TuneIcon />
            </IconButton>
          </Box>
        </>
      )}

      {/* Transmission Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        <MenuItem onClick={() => handleMenuClose("manual")}>
          {t("manual")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose("automatic")}>
          {t("automatic")}
        </MenuItem>
      </Menu>

      {/* Price Range Dialog */}
      <PriceRangeDialog
        open={openPriceDialog}
        onClose={() => setOpenPriceDialog(false)}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        handleApplyFilters={handleApplyFilters}
        setMaxPrice={setMaxPrice}
        t={t}
      />

      {/* Brand Selection Dialog */}
      <BrandSelectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        filteredBrands={filteredBrands}
        setSelectedBrand={setSelectedBrand && handleApplyFilters}
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Filters;
