import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  Grid,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addBanner, editBanner, deleteBanner } from "../services/adminServices";

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchMockedBanners = async () => {
      setBanners([
        { id: 1, imageUrl: "/images/banner1.jpg", isActive: true },
        { id: 2, imageUrl: "/images/banner2.jpg", isActive: false },
      ]);
    };
    fetchMockedBanners();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image && !editingId) return showSnackbar("Image is required", "error");

    const formData = new FormData();
    if (editingId) formData.append("id", editingId);
    if (image) formData.append("image", image);
    formData.append("isActive", isActive);

    try {
      if (editingId) {
        await editBanner(formData);
        showSnackbar("Banner updated successfully");
      } else {
        await addBanner(formData);
        showSnackbar("Banner added successfully");
      }

      setOpenDialog(false);
      setEditingId(null);
      setImage(null);
      setPreviewUrl(null);
      setIsActive(true);
    } catch (error) {
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setIsActive(banner.isActive);
    setPreviewUrl(banner.imageUrl);
    setImage(null);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      showSnackbar("Banner deleted");
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch {
      showSnackbar("Failed to delete banner", "error");
    }
  };

  const openAddDialog = () => {
    setEditingId(null);
    setImage(null);
    setIsActive(true);
    setPreviewUrl(null);
    setOpenDialog(true);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Banner Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={openAddDialog}
        >
          Add New Banner
        </Button>
      </Box>

      <Grid container spacing={3}>
        {banners.map((banner) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={banner.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={banner.imageUrl}
                alt="Banner"
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 2,
                }}
              />
              <Typography fontWeight="bold" variant="body2" mb={1}>
                Active: {banner.isActive ? "Yes" : "No"}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <IconButton color="primary" onClick={() => handleEdit(banner)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(banner.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editingId ? "Edit Banner" : "Add Banner"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadFileIcon />}
              >
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              {previewUrl && (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    mt: 2,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Is Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BannerManager;
