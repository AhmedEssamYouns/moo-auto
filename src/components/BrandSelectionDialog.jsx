import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const BrandSelectionDialog = ({
  open,
  onClose,
  filteredBrands,
  setSelectedBrand,
  t,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 500,
          maxWidth: 650,
          height: 600,
          bgcolor: "#0d0d0d",
          borderRadius: 4,
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
        {t("selectBrand")}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <TextField
          label={t("searchBrand")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          InputLabelProps={{
            sx: { color: "#999" },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mt: 3,
            maxHeight: 300,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {filteredBrands.map((brand, index) => (
            <Button
              key={index}
              fullWidth
              onClick={() => {
                setSelectedBrand(brand);
                onClose();
              }}
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                bgcolor: "#1a1a1a",
                color: "#fff",
                fontWeight: 500,
                borderRadius: 2,
                px: 2,
                py: 1.5,
                fontSize: 16,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#B30000",
                  color: "#fff",
                  transform: "scale(1.02)",
                },
              }}
            >
              {brand}
            </Button>
          ))}
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
            setSelectedBrand("");
            onClose();
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
          {t("clear")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandSelectionDialog;
