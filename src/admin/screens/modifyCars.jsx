import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useBrands, useCars, useSearch } from "../../services/hooks/useCards";
import { useLanguage } from "../../contexts/LanguageContext";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LayersIcon from "@mui/icons-material/Layers";
import AddIcon from "@mui/icons-material/Add";
import Filters from "../../components/filters";
import AdminProductCard from "../components/carCard";
import CarEditForm from "../components/editCar";
import { addCar, deleteCar, editCar } from "../../services/apis/carsServices";
import CarForm from "../components/addCar";

const Cars = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New: Search Query State
  const [filters, setFilters] = useState({
    MinPrice: null,
    MaxPrice: null,
    CarCategory: null,
    TransmissionType: null,
    Model: null,
    IsPaginated: true,
    PageNumber: currentPage,
    PageSize: productsPerPage,
    CarState: null,
    CarBrand: null,
  });

  // Fetch cars based on filters
  const { data, isLoading, error, refetch } = useCars(filters);
  const { data: brandsData, isLoading: brandsLoading } = useBrands();
  const { data: searchData, refetch: searchCars } = useSearch(searchQuery);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    setFilters((prev) => ({ ...prev, PageNumber: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters, PageNumber: 1 });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      searchCars(); // Trigger search request
    }
  };

  const handleCarSubmit = async (formData) => {
    try {
      await addCar(formData);
      alert("Car added successfully!");
      setOpenAddCar(false);
      refetch();
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car.");
    }
  };

  const handleEditCar = async (formData) => {
    try {
      await editCar(formData);
      alert("Car edited successfully!");
      setOpenEdit(false);
      refetch();
    } catch (error) {
      console.error("Error editing car:", error);
      alert("Failed to edit car.");
    }
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this car?"))) {
      try {
        await deleteCar(id);
        alert("Car deleted successfully!");
        refetch();
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete car.");
      }
    }
  };

  const handleEdit = (id) => {
    setSelectedCarId(id);
    setOpenEdit(true);
  };

  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top Section with Counts */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: isMobile ? "100%" : "50%",
          alignItems: "center",
          mb: 3,
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DirectionsCarIcon color="primary" fontSize="medium" />
          <Typography variant="h6" fontWeight="bold">
            {t("Total Cars")}:{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {data?.totalCount || 0}
            </span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LayersIcon color="primary" fontSize="medium" />
          <Typography variant="h6" fontWeight="bold">
            {t("Page")}:{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {currentPage}
            </span>{" "}
            / {data?.totalPages || 1}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t("Search cars...")}
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 3, maxWidth: 500 }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddCar(true)}
      >
        {t("Add Car")}
      </Button>

      {/* Filters */}
      {!brandsLoading && (
        <Filters
          filters={filters}
          brandsData={brandsData}
          onApplyFilters={handleApplyFilters}
        />
      )}

      {/* Cars List */}
      {isLoading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : error ? (
        <Typography color="error">{t("NoCarsFound")}</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {(searchQuery ? searchData?.items : data?.items)?.map((car) => (
              <Grid item xs={12} key={car.id}>
                <AdminProductCard
                  car={car}
                  onEdit={() => handleEdit(car.id)}
                  onDelete={() => handleDeleteCar(car.id)}
                />
              </Grid>
            ))}
          </Grid>

          {!searchQuery && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={data?.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Add Car Modal */}
      <Dialog open={openAddCar} onClose={() => setOpenAddCar(false)} fullWidth maxWidth="md">
        <DialogTitle>{t("Add Car")}</DialogTitle>
        <DialogContent>
          <CarForm onSubmit={handleCarSubmit} brandData={brandsData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCar(false)} color="secondary">
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Car Modal */}
      <CarEditForm
        open={openEdit}
        brandData={brandsData}
        onSubmit={handleEditCar}
        onClose={() => setOpenEdit(false)}
        id={selectedCarId}
      />
    </Box>
  );
};

export default Cars;
