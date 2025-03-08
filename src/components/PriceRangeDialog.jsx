import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Slider, TextField, Box, Button } from "@mui/material";

const PriceRangeDialog = ({
  open,
  onClose,
  selectedPrice,
  setSelectedPrice,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  
  handleApplyFilters,
  t,
}) => {
  const handlePriceChange = (event, newValue) => {
    setSelectedPrice(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleInputPriceChange = (type, value) => {
    const parsedValue = parseInt(value, 10);
    if (type === "min") {
      setMinPrice(parsedValue);
      setSelectedPrice([parsedValue, maxPrice]);
    } else if (type === "max") {
      setMaxPrice(parsedValue);
      setSelectedPrice([minPrice, parsedValue]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("priceRange")}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <Slider
            value={selectedPrice}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} ${t("currency")}`}
            min={0}
            max={100000}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("minPrice")}
              type="number"
              value={minPrice}
              onChange={(e) => handleInputPriceChange("min", e.target.value)}
              fullWidth
            />
            <TextField
              label={t("maxPrice")}
              type="number"
              value={maxPrice}
              onChange={(e) => handleInputPriceChange("max", e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          onClick={() => {
            setSelectedPrice([minPrice, maxPrice]);
            onClose();
            handleApplyFilters()
          }}
        >
          {t("apply")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceRangeDialog;
