import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";

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
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 500,
          maxWidth: 600,
          borderRadius: 4,
          bgcolor: "#0d0d0d",
          color: "#fff",
          boxShadow: "0 0 25px rgba(255, 0, 0, 0.3)",
          border: "1px solid #1a1a1a",
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: 4,
          fontWeight: "bold",
          fontSize: 24,
          color: "#FF3333",
          fontFamily: "Michroma",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {t("priceRange")}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            px: 1,
          }}
        >
          <Slider
            value={selectedPrice}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toLocaleString()} ${t("currency")}`}
            min={0}
            max={100000000}
            sx={{
              color: "#B30000",
              "& .MuiSlider-thumb": {
                bgcolor: "#fff",
                border: "2px solid #B30000",
              },
              "& .MuiSlider-track": {
                bgcolor: "#FF3333",
              },
              "& .MuiSlider-rail": {
                bgcolor: "#eee",
              },
              "& .MuiSlider-valueLabel": {
                color: "#fff",
                bgcolor: "#B30000",
                fontWeight: "bold",
                borderRadius: 1,
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("minPrice")}
              type="number"
              value={minPrice}
              onChange={(e) => handleInputPriceChange("min", e.target.value)}
              fullWidth
              variant="filled"
              InputProps={{
                sx: {
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#222" },
                },
              }}
              InputLabelProps={{ sx: { color: "#aaa" } }}
            />
            <TextField
              label={t("maxPrice")}
              type="number"
              value={maxPrice}
              onChange={(e) => handleInputPriceChange("max", e.target.value)}
              fullWidth
              variant="filled"
              InputProps={{
                sx: {
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#222" },
                },
              }}
              InputLabelProps={{ sx: { color: "#aaa" } }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "#333",
            px: 3,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#444",
            },
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            setSelectedPrice([minPrice, maxPrice]);
            onClose();
            handleApplyFilters();
          }}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "#B30000",
            px: 3,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#FF3333",
            },
          }}
        >
          {t("apply")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceRangeDialog;
