import React, { useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  Typography,
  Button,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TuneIcon from "@mui/icons-material/Tune";
import { useLanguage } from "../contexts/LanguageContext";

const Filters = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleOpenMenu = (event, filter) => {
    if (isMobile) {
      setOpenBottomSheet(true);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedFilter(filter);
    }
  };

  const handleCloseBottomSheet = () => setOpenBottomSheet(false);
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilter("");
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
          {/* Filter Items */}
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
              text={t("usedCars")}
              onClick={handleOpenMenu}
            />
            <FilterItem
              icon={<CategoryIcon />}
              text={t("anyMake")}
              onClick={handleOpenMenu}
            />
            <FilterItem
              icon={<LocalOfferIcon />}
              text={t("anyBrand")}
              onClick={handleOpenMenu}
            />
            <FilterItem
              icon={<AttachMoneyIcon />}
              text={t("allPrices")}
              onClick={handleOpenMenu}
            />
          </Box>

          {/* Menu Button */}
          <IconButton
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#444" : "#222",
              color: "white",
              borderRadius: "50%",
              width: 50,
              height: 50,
              ml: 2,
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#555" : "#333",
              },
            }}
            onClick={(e) => handleOpenMenu(e, t("filters"))}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Paper>
      )}

      {/* Bottom Sheet for Mobile */}
      <Drawer
        anchor="bottom"
        open={openBottomSheet}
        onClose={handleCloseBottomSheet}
        PaperProps={{ sx: { borderRadius: "20px 20px 0 0", p: 2 } }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          {t("filterOptions")}
        </Typography>
        <MenuItem onClick={handleCloseBottomSheet}>{t("option1")}</MenuItem>
        <MenuItem onClick={handleCloseBottomSheet}>{t("option2")}</MenuItem>
        <MenuItem onClick={handleCloseBottomSheet}>{t("option3")}</MenuItem>
        <Button onClick={handleCloseBottomSheet} fullWidth variant="contained">
          {t("applyFilters")}
        </Button>
      </Drawer>

      {/* Menu for Filter Options */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          {t("option1")} {selectedFilter}
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          {t("option2")} {selectedFilter}
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          {t("option3")} {selectedFilter}
        </MenuItem>
      </Menu>
    </>
  );
};

// Reusable Filter Item Component
const FilterItem = ({ icon, text, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        "&:hover": { color: theme.palette.primary.main },
      }}
      onClick={(e) => onClick(e, text)}
    >
      {icon}
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{text}</Typography>
    </Box>
  );
};

export default Filters;
