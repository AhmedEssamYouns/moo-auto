import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Chip,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Fade,
  IconButton,
  Button,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import PriceRangeDialog from "./PriceRangeDialog";
import BrandSelectionDialog from "./BrandSelectionDialog";
import MobileDrawerFilters from "./mobileFilter";

const Filters = ({ onApplyFilters, brandsData, filters }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isDark = theme.palette.mode === "dark";

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

  return (
    <>
      {!isMobile && (
        <Fade in timeout={900}>
          <Paper
            elevation={8}
            sx={{
              mx: "auto",
              width: "95%",
              maxWidth: 900,
              my: 4,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              flexWrap: "wrap",
              gap: 2,
              background: isDark ? "#1e1e1e" : "#f9f9f9",
              border: "1px solid",
              borderColor: isDark ? "#444" : "#ddd",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  setUsedCars((prev) => !prev);
                  handleApplyFilters({ CarState: usedCars ? 1 : 2 });
                }}
                variant="contained"
                sx={{
                  backgroundColor: isDark ? "#333" : "#ffffff",
                  border: "1px solid",
                  borderColor: isDark ? "#555" : "#ccc",
                  color: isDark ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: isDark ? "#444" : "#f0f0f0",
                  },
                }}
              >
                {usedCars ? t("usedCars") : t("newCars")}
              </Button>

              <Button
                onClick={() => setOpenDialog(true)}
                variant="contained"
                sx={{
                  backgroundColor: isDark ? "#333" : "#ffffff",
                  border: "1px solid",
                  borderColor: isDark ? "#555" : "#ccc",
                  color: isDark ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: isDark ? "#444" : "#f0f0f0",
                  },
                }}
              >
                {t("allBrands")}
              </Button>

              <Button
                onClick={() => setOpenPriceDialog(true)}
                variant="contained"
                sx={{
                  backgroundColor: isDark ? "#333" : "#ffffff",
                  border: "1px solid",
                  borderColor: isDark ? "#555" : "#ccc",
                  color: isDark ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: isDark ? "#444" : "#f0f0f0",
                  },
                }}
              >
                {t("allPrices")}
              </Button>

              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="contained"
                sx={{
                  backgroundColor: isDark ? "#333" : "#ffffff",
                  border: "1px solid",
                  borderColor: isDark ? "#555" : "#ccc",
                  color: isDark ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: isDark ? "#444" : "#f0f0f0",
                  },
                }}
              >
                {selectedTransmission === 1
                  ? t("manual")
                  : selectedTransmission === 2
                  ? t("automatic")
                  : t("TransmissionType")}
              </Button>
            </Box>
          </Paper>
        </Fade>
      )}

      {(selectedBrand ||
        selectedPrice[0] > 0 ||
        selectedPrice[1] < 1000000 ||
        selectedTransmission ||
        usedCars !== null) && (
        <Fade in timeout={1200}>
          <Paper
            sx={{
              mx: "auto",
              width: isMobile ? "100%" : "80%",
              my: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 8,
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 1,
              border: "1px solid",
              borderColor: isDark ? "#444" : "#ddd",
              background: isDark ? "#1e1e1e" : "#fff",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {selectedBrand && (
                <Chip
                  label={`${t("Brand")}: ${
                    brandsData.find((b) => b.id === selectedBrand)?.name
                  }`}
                  onDelete={() => {
                    setSelectedBrand(null);
                    handleApplyFilters({ CarBrand: null });
                  }}
                />
              )}
              {selectedPrice[0] > 0 && (
                <Chip
                  label={`${t("price")}: ${selectedPrice[0]} - ${selectedPrice[1]}`}
                  onDelete={() => {
                    setSelectedPrice([0, 100000]);
                    handleApplyFilters({ MinPrice: 0, MaxPrice: null });
                  }}
                />
              )}
              {selectedTransmission && (
                <Chip
                  label={`${t("TransmissionType")}: ${
                    selectedTransmission === 1 ? t("manual") : t("automatic")
                  }`}
                  onDelete={() => {
                    setSelectedTransmission(null);
                    handleApplyFilters({ TransmissionType: null });
                  }}
                />
              )}
              {usedCars !== null && (
                <Chip
                  label={usedCars ? t("usedCars") : t("newCars")}
                  onDelete={() => {
                    setUsedCars(null);
                    handleApplyFilters({ CarState: null });
                  }}
                />
              )}
            </Box>

            <Chip onDelete={handleClearFilters} label={t("ClearAllFilters")} />
          </Paper>
        </Fade>
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
                backgroundColor: isDark ? "#333" : "#fff",
                color: isDark ? "#fff" : "#000",
                borderRadius: "50%",
                boxShadow: 3,
                height:50,
                width:50,
                padding: 2,
                border: "1px solid",
                borderColor: isDark ? "#555" : "#ccc",
              }}
            >
              +
            </IconButton>
          </Box>
        </>
      )}

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
