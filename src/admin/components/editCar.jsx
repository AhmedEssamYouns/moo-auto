import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCar } from "../../services/hooks/useCards";
import { editCar } from "../../services/apis/carsServices";
const CarEditForm = ({ open, onClose, id, brandData }) => {
  const { data: car, isLoading } = useCar(id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name,
        status: car.status,
        brandId: car.brandId,
        transmission: car.transmission,
        price: car.price,
        description: car.description,
        currentImages: car.images || [],
        addImages: [],
      });
    }
  }, [car]);

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (!formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentImages: prev.currentImages.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        addImages: [...prev.addImages, ...newImages],
      }));
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.status &&
      formData.brandId &&
      formData.transmission &&
      formData.price &&
      formData.description.trim() &&
      (formData.currentImages.length > 0 || formData.addImages.length > 0)
    );
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    setLoading(true);

    try {
      await editCar(id, formData);
      onClose();
    } catch (error) {
      console.error("Failed to update car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        {/* Images Section */}
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 2 }}>
          {[...formData.currentImages, ...formData.addImages].map((img, index) => (
            <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
              <img src={img} alt={`Car ${index + 1}`} style={{ width: "120px", height: "80px", borderRadius: 4 }} />
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)" }}
                onClick={() => handleDeleteImage(index)}
              >
                <Delete sx={{ color: "white" }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Image Upload */}
        <Button variant="contained" component="label" fullWidth>
          Upload Images
          <input type="file" multiple hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {/* Form Fields */}
        <TextField label="Car Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />

        {/* Brand Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Brand</InputLabel>
          <Select name="brandId" value={formData.brandId} onChange={handleChange}>
            {brandData.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Transmission Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Transmission</InputLabel>
          <Select name="transmission" value={formData.transmission} onChange={handleChange}>
            <MenuItem value={1}>Manual</MenuItem>
            <MenuItem value={2}>Automatic</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="normal" />

        {/* Status Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value={1}>New</MenuItem>
            <MenuItem value={2}>Used</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Close
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={!isFormValid() || loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarEditForm;
