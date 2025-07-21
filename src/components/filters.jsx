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
  Typography,
  Button,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import PriceRangeDialog from "./PriceRangeDialog";
import BrandSelectionDialog from "./BrandSelectionDialog";
import MobileDrawerFilters from "./mobileFilter";
import TuneIcon from "@mui/icons-material/Tune";

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

  return (
    <>
      {!isMobile && (
        <Fade in timeout={900}>
          <Paper
            elevation={24}
            sx={{
              mx: "auto",
              width: "95%",
              maxWidth: 900,
              my: 6,
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              flexWrap: "wrap",
              gap: 2,
              background: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(60,0,0,0.5))",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 60px rgba(255,0,0,0.2)",
              position: "relative",
            }}
          >
            <TuneIcon
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "#ff4444",
                fontSize: 28,
              }}
            />

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
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {usedCars ? t("usedCars") : t("newCars")}
              </Button>

              <Button
                onClick={() => setOpenDialog(true)}
                variant="contained"
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {t("allBrands")}
              </Button>

              <Button
                onClick={() => setOpenPriceDialog(true)}
                variant="contained"
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {t("allPrices")}
              </Button>

              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="contained"
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
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
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              color: "white",
              boxShadow: "0 0 30px rgba(255,255,255,0.05)",
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
                bgcolor: "#000",
                color: "white",
                borderRadius: "50%",
                boxShadow: 3,
                padding: 2,
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
