// pages/Providers.js
import React, { useEffect, useState } from "react";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import {
  getProviders,
  addProvider,
  addInstallmentPlan,
  deleteProviderapi,
} from "../services/adminServices";
import ProviderTable from "../components/providerTable";
import AddProviderDialog from "../components/AddProviderDialog";
import AddInstallmentPlanDialog from "../components/AddInstallmentPlanDialog";
import ProviderDetailsDialog from "../components/providerWithDialog";
import { deletePlan } from "../services/adminServices";
const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openAddPlan, setOpenAddPlan] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      const data = await getProviders();
      setProviders(data);
      setFilteredProviders(data); // Initial filtering based on all providers
    };

    fetchProviders();
  }, []);

  // Filter providers based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = providers.filter((provider) =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProviders(filtered);
    } else {
      setFilteredProviders(providers);
    }
  }, [searchQuery, providers]);

  const handleAddProvider = async (name, image) => {
    try {
      await addProvider(name, image);
      setSnackbarMessage("Provider added successfully");
      setSnackbarOpen(true);
      setOpenAddProvider(false);
      // Refetch providers
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      setSnackbarMessage("Failed to add provider");
      setSnackbarOpen(true);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await deletePlan(planId);
      setSnackbarMessage("Installment plan deleted successfully");
      setSnackbarOpen(true);
      // Refetch providers after deleting installment plan
      const data = await getProviders();
      setProviders(data);
      setFilteredProviders(data); // Update the filtered list as well

      // Update selectedProvider to trigger a re-render of the dialog with the new data
      if (selectedProvider) {
        const updatedProvider = data.find(
          (provider) => provider.id === selectedProvider.id
        );
        setSelectedProvider(updatedProvider);
      }
    } catch (error) {
      setSnackbarMessage("Failed to delete installment plan");
      setSnackbarOpen(true);
    }
  };

  const handleAddInstallmentPlan = async (plan) => {
    try {
      await addInstallmentPlan(selectedProvider.id, plan);
      setSnackbarMessage("Installment plan added successfully");
      setSnackbarOpen(true);
      setOpenAddPlan(false);
      // Refetch providers after adding installment plan
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      setSnackbarMessage("Failed to add installment plan");
      setSnackbarOpen(true);
    }
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (provider) => {
    setSelectedProvider(provider);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProvider(null);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.roles.includes("Owner");
  const isEditor = user?.roles.includes("Editor");
  const isAdmin = user?.roles.includes("Admin");
  const deleteProvider = async (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?"))
      return;
    try {
      await deleteProviderapi(id);
      setSnackbarMessage("Provider deleted successfully");
      setSnackbarOpen(true);
      // Refetch providers after deleting provider
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      setSnackbarMessage("Failed to delete provider");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <TextField
        label="Search by Provider Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      {(isOwner || isEditor) && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddProvider(true)}
          sx={{ marginBottom: 3 }}
        >
          Add New Provider
        </Button>
      )}
      <Typography variant="h6" gutterBottom>
        Providers
      </Typography>
      {filteredProviders.length === 0 ? (
        <Typography variant="body1">No providers found</Typography>
      ) : (
        <ProviderTable
          providers={filteredProviders}
          onRowClick={handleRowClick}
          onDeleteProvider={deleteProvider}
        />
      )}
      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      {/* Add Provider Dialog */}
      <AddProviderDialog
        open={openAddProvider}
        onClose={() => setOpenAddProvider(false)}
        onSubmit={handleAddProvider}
      />

      {/* Add Installment Plan Dialog */}

      <ProviderDetailsDialog
        onDeletePlan={handleDeletePlan}
        onAddPlan={handleAddInstallmentPlan}
        open={dialogOpen}
        provider={selectedProvider}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default Providers;
