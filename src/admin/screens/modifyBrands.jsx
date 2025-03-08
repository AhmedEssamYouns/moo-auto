import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useBrands } from "../../services/hooks/useCards";
import { editBrand, deleteBrand, addBrand } from "../services/adminServices";

const ModifyBrands = () => {
  const { data: brands, isLoading, error, refetch } = useBrands();
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleOpenDialog = (brand = null) => {
    setEditingBrand(brand);
    setBrandName(brand ? brand.name : "");
    setBrandImage(null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setBrandName("");
    setBrandImage(null);
    setEditingBrand(null);
    setLoading(false);
  };

  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    setDeleteLoading(id);
    try {
      await deleteBrand(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete brand", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleFileChange = (e) => {
    setBrandImage(e.target.files[0]);
  };

  const handleAddOrUpdateBrand = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", brandName);
    if (brandImage) {
      formData.append("image", brandImage);
    }

    try {
      if (editingBrand) {
        formData.append("id", editingBrand.id);
        await editBrand(editingBrand.id, formData);
      } else {
        await addBrand(formData);
      }

      refetch();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save brand", error);
      setLoading(false);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching brands</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Modify Brands
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Brand"}
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands?.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "contain",
                      borderRadius: 8,
                      maxWidth: "100%",
                    }}
                  />
                </TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(brand)}
                    disabled={loading}
                  >
                    {loading && editingBrand?.id === brand.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      "Edit"
                    )}
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteBrand(brand.id)}
                    sx={{ ml: 1 }}
                    disabled={deleteLoading === brand.id}
                  >
                    {deleteLoading === brand.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add / Edit */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingBrand ? "Edit Brand" : "Add Brand"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddOrUpdateBrand} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : editingBrand ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModifyBrands;
