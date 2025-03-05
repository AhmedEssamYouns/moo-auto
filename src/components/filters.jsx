import React, { useState, useEffect } from "react";
import { Box, Paper, IconButton, Icon, useMediaQuery, useTheme } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import { useLanguage } from "../contexts/LanguageContext";
import PriceRangeDialog from "./PriceRangeDialog";
import BrandSelectionDialog from "./BrandSelectionDialog";
import MobileDrawerFilters from "./mobileFilter";
import FilterItem from "./FilterItem"; // Filter Item Component

const Filters = ({ onApplyFilters, allBrands }) => {
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

  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFilter = (filter, value) => {
    if (filter === "transmission") setSelectedTransmission(value);
    if (filter === "brand") setSelectedBrand(value);
    if (filter === "usedCars") setUsedCars(!usedCars);
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
              icon={<AttachMoneyIcon />}
              text={t(
                selectedTransmission === "manual" ? "manual" : "automatic"
              )}
              onClick={() => setOpenDialog(true)}
            />
          </Box>

          <Icon
            sx={{
              justifyContent: "center",
              alignItems: "center",
              bgcolor: theme.palette.mode === "dark" ? "#444" : "#222",
              color: "white",
              borderRadius: "50%",
            }}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </Icon>
        </Paper>
      )}

      {/* Mobile View */}
      {isMobile && (
        <MobileDrawerFilters
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
      )}

      {/* Price Range Dialog */}
      <PriceRangeDialog
        open={openPriceDialog}
        onClose={() => setOpenPriceDialog(false)}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        t={t}
      />

      {/* Brand Selection Dialog */}
      <BrandSelectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        filteredBrands={filteredBrands}
        setSelectedBrand={setSelectedBrand}
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Filters;
