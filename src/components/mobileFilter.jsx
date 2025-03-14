import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slider,
  useTheme,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const MobileDrawerFilters = ({
  openBottomSheet,
  setOpenDialog,
  setOpenBottomSheet,
  allBrands,
  selectedBrand,
  onApplyFilters,
  setSelectedBrand,
  selectedPrice,
  setSelectedPrice,
  handleSelectFilter,
  handlePriceRangeClick,
  handleApplyFilters,
  setOpenPriceDialog,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(allBrands);
  const { t } = useLanguage();
  const theme = useTheme();
  const [minPrice, setMinPrice] = useState(selectedPrice[0]);
  const [maxPrice, setMaxPrice] = useState(selectedPrice[1]);
  // New state to track selected transmission type
  const [selectedTransmission, setSelectedTransmission] = useState("");

  // Filter brands based on search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = allBrands.filter((brand) =>
      brand.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const handlePriceChange = (_, newValue) => {
    setSelectedPrice(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handlePriceManualChange = (e, type) => {
    const value = e.target.value;
    if (type === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
    setSelectedPrice([minPrice, maxPrice]);
  };

  return (
    <>
      <Drawer
        anchor="bottom"
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        PaperProps={{ sx: { borderRadius: "20px 20px 0 0", p: 2 } }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          {t('filterOptions')}
        </Typography>

        {/* Transmission Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {t("Transmission")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSelectedTransmission("manual");
                handleSelectFilter("transmission", "manual");
              }}
              sx={{
                mr: 1,
                color:
                  selectedTransmission === "manual"
                    ? theme.palette.mode === "light"
                      ? "white"
                      : "white"
                    : theme.palette.mode === "dark"
                    ? "white"
                    : theme.palette.primary.main,

                backgroundColor:
                  selectedTransmission === "manual"
                    ? theme.palette.primary.main
                    : "transparent",
              }}
            >
              {t("manual")}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSelectedTransmission("automatic");
                handleSelectFilter("transmission", "automatic");
              }}
              sx={{
                ml: 1,
                color:
                  selectedTransmission === "automatic"
                    ? theme.palette.mode === "light"
                      ? "white"
                      : "white"
                    : theme.palette.mode === "dark"
                    ? "white"
                    : theme.palette.primary.main,
                backgroundColor:
                  selectedTransmission === "automatic"
                    ? theme.palette.primary.main
                    : "transparent",
              }}
            >
              {t("automatic")}
            </Button>
          </Box>
        </Box>

        {/* Brand Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {t("Brand")}
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenDialog(true)}
            sx={{ mb: 1 }}
          >
            {selectedBrand || t("Brand")}
          </Button>
        </Box>

        {/* Price Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {t("priceRange")}
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenPriceDialog(true)}
            sx={{ mb: 1 }}
          >
            {selectedPrice
              ? `${selectedPrice[0]} - ${selectedPrice[1]} EGP`
              : "Select Price Range"}
          </Button>
        </Box>

        {/* Apply Button */}
        <Button
          onClick={() => {
            onApplyFilters({
              TransmissionType: selectedTransmission == "manual" ? 1 : 2,
            });
            setOpenBottomSheet(false);
          }}
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          {t("ApplyFilters")}
        </Button>
      </Drawer>

      {/* Brand Search Dialog */}

      {/* Price Range Dialog */}
      {/* <Dialog
        open={openPriceDialog}
        onClose={() => setOpenPriceDialog(false)}
        sx={{
          width: 380,
          height: 500,
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <DialogTitle>Price Range</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Select Price Range</Typography>
          <Slider
            value={selectedPrice}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
            valueLabelFormat={(value) => `${value} EGP`}
          />
          <Box sx={{ mt: 2 }}>
            <Typography mb={2}>Manual Price Input</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Min Price"
                variant="outlined"
                value={minPrice}
                onChange={(e) => handlePriceManualChange(e, "min")}
                sx={{ width: "45%" }}
              />
              <TextField
                label="Max Price"
                variant="outlined"
                value={maxPrice}
                onChange={(e) => handlePriceManualChange(e, "max")}
                sx={{ width: "45%" }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenPriceDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSelectFilter("price", selectedPrice);
              setOpenPriceDialog(false);
            }}
            variant="outlined"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default MobileDrawerFilters;
