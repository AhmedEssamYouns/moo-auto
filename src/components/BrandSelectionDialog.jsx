import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from "@mui/material";

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
          height:600,
          padding: 2,  
          maxWidth: 650, 
          margin: "auto",
        },
      }}
    >
      <DialogTitle pt={4}>{t("selectBrand")}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("searchBrand")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          {filteredBrands.map((brand, index) => (
            <Button
              key={index}
              fullWidth
              variant="outlined"
              onClick={() => {
                setSelectedBrand(brand);
                onClose();
              }}
            >
              {brand}
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          onClick={() => {
            setSelectedBrand("");
            onClose();
          }}
        >
          {t("clear")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandSelectionDialog;
