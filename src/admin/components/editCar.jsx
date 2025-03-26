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
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCar } from "../../services/hooks/useCards";
import { editCar } from "../../services/apis/carsServices";
import { CarCategory } from "../../types/e-nums";
import { useLanguage } from "../../contexts/LanguageContext";

const CarEditForm = ({ open, onClose, id, brandData, onSubmit }) => {
  const { data: car, isLoading ,refetch} = useCar(id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { t } = useLanguage();
useEffect(() => {
  refetch();
}, []);
  useEffect(() => {
    if (!open) {
      setFormData(null);
      setDeletedImages([]);
      setPreviewImages([]);
      setSelectedImages([]);
      setImageError(false);
      refetch();
    }
  }, [open]);
  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || "",
        status: car.status || "",
        brandId: car.brandId || "",
        transmission: car.transmission || "",
        price: car.price || "",
        description: car.description || "",
        model: car.model || "",
        category: car.category || "",
        colors: car.colors || [],
        features: car.features || [],
        currentImages: car.images || [],
      });
      setPreviewImages(car.images || []);
    }
  }, [car]);

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
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
    setDeletedImages((prev) => [...prev, previewImages[index]]);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleColorChange = (index, field, value) => {
    setFormData((prev) => {
      const colors = [...prev.colors];
      colors[index] = { ...colors[index], [field]: value };
      return { ...prev, colors };
    });
  };

  const handleFeatureChange = (index, field, value) => {
    setFormData((prev) => {
      const features = [...prev.features];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, features };
    });
  };

  const addNewColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { color: "", isAvailable: false }],
    }));
  };

  const addNewFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { name: "", value: "" }],
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newImagePreviews]);

    event.target.value = ""; // Reset input to allow re-uploading the same image
  };

  const handleFormSubmit = () => {
    if (previewImages.length === 0) {
      setImageError(true);
      return;
    }

    setImageError(false);

    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("brandId", formData.brandId);
    formDataToSend.append("transmission", formData.transmission);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    formData.colors.forEach((color, index) => {
      formDataToSend.append(`colors[${index}].color`, color.color);
      formDataToSend.append(
        `colors[${index}].isAvailable`,
        color.isAvailable ? "true" : "false"
      );
    });

    formData.features.forEach((feature, index) => {
      formDataToSend.append(`features[${index}].name`, feature.name);
      formDataToSend.append(`features[${index}].value`, feature.value);
    });

    selectedImages.forEach((image, index) => {
      formDataToSend.append(`addImages[${index}]`, image);
    });

    deletedImages.forEach((image, index) => {
      formDataToSend.append(`deletedImages[${index}]`, image);
    });

    setLoading(true);
    onSubmit(formDataToSend)
      .then(() => onClose())
      .catch((error) => console.error("Failed to update car:", error))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 2 }}>
          {imageError && (
            <Typography color="error" sx={{ mt: 1 }}>
              Please upload at least one image.
            </Typography>
          )}

          {imageError && (
            <Typography color="error" sx={{ mt: 1 }}>
              Please upload at least one image.
            </Typography>
          )}

          {previewImages.map((img, index) => (
            <Box
              key={index}
              sx={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={img}
                alt={`Car ${index + 1}`}
                style={{ width: "120px", height: "80px", borderRadius: 4 }}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  background: "rgba(0,0,0,0.5)",
                }}
                onClick={() => handleDeleteImage(index)}
              >
                <Delete sx={{ color: "white" }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button variant="contained" component="label" fullWidth>
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        <Typography fontWeight="bold">Car Name</Typography>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography fontWeight="bold">Description</Typography>
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography fontWeight="bold">Price</Typography>
        <TextField
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography fontWeight="bold">Model</Typography>
        <TextField
          name="model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography fontWeight="bold">Brand</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Brand</InputLabel>
          <Select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
          >
            {brandData.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("Category")}</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {Object.entries(CarCategory).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {t(`${value}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography fontWeight="bold">Colors</Typography>
        {formData.colors.map((color, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              label="Color"
              value={color.color}
              onChange={(e) =>
                handleColorChange(index, "color", e.target.value)
              }
              fullWidth
            />
            <Select
              value={color.isAvailable.toString()}
              onChange={(e) =>
                handleColorChange(
                  index,
                  "isAvailable",
                  e.target.value === "true"
                )
              }
            >
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Not Available</MenuItem>
            </Select>
          </Box>
        ))}
        <Button onClick={addNewColor} variant="outlined">
          Add Color
        </Button>

        <Typography fontWeight="bold">Features</Typography>
        {formData.features.map((feature, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              label="Feature Name"
              value={feature.name}
              onChange={(e) =>
                handleFeatureChange(index, "name", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Feature Value"
              value={feature.value}
              onChange={(e) =>
                handleFeatureChange(index, "value", e.target.value)
              }
              fullWidth
            />
          </Box>
        ))}
        <Button onClick={addNewFeature} variant="outlined">
          Add Feature
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Close
        </Button>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarEditForm;
