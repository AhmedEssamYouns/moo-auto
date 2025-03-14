import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  IconButton,
  Icon,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import TuneIcon from "@mui/icons-material/Tune";
import { useLanguage } from "../contexts/LanguageContext";
import PriceRangeDialog from "./PriceRangeDialog";
import BrandSelectionDialog from "./BrandSelectionDialog";
import MobileDrawerFilters from "./mobileFilter";
import FilterItem from "./FilterItem";
import TransmissionIcon from "@mui/icons-material/Transform";

const Filters = ({ onApplyFilters, brandsData, filters }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPrice, setSelectedPrice] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [usedCars, setUsedCars] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);

  const allBrands = brandsData?.map((brand) => brand.name) || [];
  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (filters) {
      setSelectedPrice([filters.MinPrice ?? 0, filters.MaxPrice ?? 10000000]);
      setSelectedBrand(filters.CarBrand || null);
      setSelectedTransmission(filters.TransmissionType || null);
      setUsedCars(
        filters.CarState === 2 ? true : filters.CarState === 1 ? false : null
      );
    }
  }, [filters]);

  const handleApplyFilters = (newFilters = {}) => {
    onApplyFilters({
      MinPrice: selectedPrice[0],
      MaxPrice: selectedPrice[1] === 100000 ? null : selectedPrice[1],
      CarBrand: selectedBrand,
      CarState: usedCars === true ? 2 : usedCars === false ? 1 : null,
      TransmissionType: selectedTransmission,
      ...newFilters,
    });
    setOpenBottomSheet(false);
  };

  const handleClearFilters = () => {
    setSelectedPrice([0, 100000]);
    setSelectedBrand(null);
    setSelectedTransmission(null);
    setUsedCars(null);

    onApplyFilters({
      MinPrice: 0,
      MaxPrice: null,
      CarBrand: null,
      CarState: null,
      TransmissionType: null,
    });
  };

  const removePriceFilter = () => {
    setSelectedPrice([0, 100000]);
    onApplyFilters({ MinPrice: 0, MaxPrice: null });
  };

  const removeBrandFilter = () => {
    setSelectedBrand(null);
    onApplyFilters({ CarBrand: null });
  };

  const removeTransmissionFilter = () => {
    setSelectedTransmission(null);
    onApplyFilters({ TransmissionType: null });
  };

  const removeUsedCarFilter = () => {
    setUsedCars(null);
    onApplyFilters({ CarState: null });
  };

  return (
    <>
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
              text={usedCars ? t("usedCars") : t("newCars")}
              onClick={() => {
                setUsedCars((prev) => !prev);
                handleApplyFilters({ CarState: usedCars ? 1 : 2 });
              }}
            />

            <FilterItem
              icon={<LocalOfferIcon />}
              text={t("allBrands")}
              onClick={() => setOpenDialog(true)}
            />
            <FilterItem
              icon={<AttachMoneyIcon />}
              text={t("allPrices")}
              onClick={() => setOpenPriceDialog(true)}
            />
            <FilterItem
              icon={<TransmissionIcon />}
              text={selectedTransmission === 1 ? t("manual") : t("automatic")}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          </Box>

          <Icon sx={{ justifyContent: "center", alignItems: "center" }}>
            <TuneIcon sx={{ fontSize: 28 }} />
          </Icon>
        </Paper>
      )}

      {(selectedBrand ||
        selectedPrice[0] > 0 ||
        selectedPrice[1] < 1000000 ||
        selectedTransmission ||
        usedCars !== null) && (
        <Paper
          sx={{
            mx: "auto",
            width: isMobile ? "100%" : "70%",
            my: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {selectedBrand && (
              <Chip
                label={`${t("Brand")}: ${
                  brandsData.find((b) => b.id === selectedBrand)?.name
                }`}
                onDelete={() => removeBrandFilter()}
              />
            )}
            {selectedPrice[0] > 0 && (
              <Chip
                label={`${t("price")}: ${selectedPrice[0]} - ${
                  selectedPrice[1]
                }`}
                onDelete={() => removePriceFilter()}
              />
            )}
            {selectedTransmission && (
              <Chip
                label={`${t("TransmissionType")}: ${
                  selectedTransmission === 1 ? t("manual") : t("automatic")
                }`}
                onDelete={() => removeTransmissionFilter()}
              />
            )}
            {usedCars !== null && (
              <Chip
                label={usedCars ? t("usedCars") : t("newCars")}
                onDelete={() => removeUsedCarFilter()}
              />
            )}
          </Box>

          <Chip
            onDelete={handleClearFilters}
            label={t("ClearAllFilters")}
          />
        </Paper>
      )}

      {isMobile && (
        <>
          <MobileDrawerFilters
            setOpenPriceDialog={setOpenPriceDialog}
            openBottomSheet={openBottomSheet}
            setOpenBottomSheet={setOpenBottomSheet}
            allBrands={allBrands}
            onApplyFilters={handleApplyFilters}
            setOpenDialog={setOpenDialog}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />

          <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
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
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setSelectedTransmission(1);
            handleApplyFilters({ TransmissionType: 1 });
            setAnchorEl(null);
          }}
        >
          {t("manual")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedTransmission(2);
            handleApplyFilters({ TransmissionType: 2 });
            setAnchorEl(null);
          }}
        >
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
        setMaxPrice={setMaxPrice}
        handleApplyFilters={handleApplyFilters}
        t={t}
      />

      {/* Brand Selection Dialog */}
      <BrandSelectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        filteredBrands={filteredBrands}
        setSelectedBrand={(brandName) => {
          const selectedBrandObj = brandsData.find(
            (brand) => brand.name === brandName
          );
          setSelectedBrand(selectedBrandObj?.id || null);
          handleApplyFilters({ CarBrand: selectedBrandObj?.id || null });
        }}
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Filters;
