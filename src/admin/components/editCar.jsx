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
import DeleteIcon from "@mui/icons-material/Delete";
import { useCar } from "../../services/hooks/useCards";
import { editCar } from "../../services/apis/carsServices";
import { CarCategory } from "../../types/e-nums";
import { useLanguage } from "../../contexts/LanguageContext";

const CarEditForm = ({ open, onClose, id, brandData }) => {
  const { data: car, isLoading, refetch } = useCar(id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { t } = useLanguage();

  // ---------- helpers for batching ----------
  const chunkArray = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  const appendIf = (fd, key, val) => {
    if (val === null || val === undefined) return;
    if (typeof val === "string" && val.trim() === "") return;
    fd.append(key, val);
  };

  const buildBaseFormDataSelective = (carId, data) => {
    const fd = new FormData();
    fd.append("id", String(carId));

    appendIf(fd, "brandId", data.brandId);
    appendIf(fd, "transmission", data.transmission);
    appendIf(fd, "price", data.price);
    appendIf(fd, "model", data.model);
    appendIf(fd, "name", data.name);
    appendIf(fd, "status", data.status);
    appendIf(fd, "description", data.description);
    appendIf(fd, "category", data.category);

    if (Array.isArray(data.colors)) {
      const colors = data.colors.filter(
        (c) => c && typeof c.color === "string" && c.color.trim() !== ""
      );
      colors.forEach((c, i) => {
        fd.append(`colors[${i}].color`, c.color);
        fd.append(`colors[${i}].isAvailable`, c.isAvailable ? "true" : "false");
      });
    }

    if (Array.isArray(data.features)) {
      const features = data.features.filter(
        (f) => f && typeof f.name === "string" && f.name.trim() !== ""
      );
      features.forEach((f, i) => {
        fd.append(`features[${i}].name`, f.name);
        appendIf(fd, `features[${i}].value`, f.value ?? "");
      });
    }

    return fd;
  };

  const sendEditInBatches = async ({
    carId,
    payload,
    files,
    toDelete,
    batchSize = 4,
    onProgress,
  }) => {
    const batches = chunkArray(files, batchSize);

    const sendBatch = async (batchIndex) => {
      const fd =
        batchIndex === 0
          ? buildBaseFormDataSelective(carId, payload) // first call: metadata + images + deletes
          : new FormData(); // subsequent calls: only id + images

      if (batchIndex > 0) {
        fd.append("id", String(carId));
      }

      const current = batches[batchIndex] ?? [];
      current.forEach((file, i) => fd.append(`addImages[${i}]`, file));

      if (batchIndex === 0 && Array.isArray(toDelete) && toDelete.length > 0) {
        toDelete.forEach((img, i) => fd.append(`deletedImages[${i}]`, img));
      }

      await editCar(carId, fd); // uses your existing API service
      if (onProgress) {
        const percent = Math.round(
          ((batchIndex + 1) / Math.max(batches.length, 1)) * 100
        );
        onProgress(percent);
      }
    };

    if (batches.length === 0) {
      // no new images: single safe call with only non-empty metadata + deletes
      const fd = buildBaseFormDataSelective(carId, payload);
      if (Array.isArray(toDelete) && toDelete.length > 0) {
        toDelete.forEach((img, i) => fd.append(`deletedImages[${i}]`, img));
      }
      await editCar(carId, fd);
      onProgress?.(100);
      return;
    }

    for (let i = 0; i < batches.length; i++) {
      await sendBatch(i);
    }
  };
  // -----------------------------------------

  useEffect(() => {
    if (id) refetch();
  }, [id, refetch]);

  useEffect(() => {
    if (!open) {
      setFormData(null);
      setDeletedImages([]);
      setPreviewImages([]);
      setSelectedImages([]);
      setImageError(false);
    } else if (id) {
      refetch();
    }
  }, [open, id, refetch]);

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
        colors: Array.isArray(car.colors) ? car.colors : [],
        features: Array.isArray(car.features) ? car.features : [],
        currentImages: Array.isArray(car.images) ? car.images : [],
      });
      setPreviewImages(Array.isArray(car.images) ? car.images : []);
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
      features[index] = { ...prev.features[index], [field]: value };
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
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newImagePreviews]);

    event.target.value = ""; // allow re-selecting the same file(s)
  };

  const handleFormSubmit = async () => {
    if (previewImages.length === 0) {
      setImageError(true);
      return;
    }
    setImageError(false);

    setLoading(true);
    try {
      await sendEditInBatches({
        carId: id,
        payload: formData,
        files: selectedImages,    // batched 4 per request
        toDelete: deletedImages,  // sent only on first request
        batchSize: 4,
        onProgress: () => {},     // optional hook for UI progress
      });

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
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 2 }}>
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
                style={{ width: "120px", height: "80px", borderRadius: 4, objectFit: "cover" }}
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
                <DeleteIcon sx={{ color: "white" }} />
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

        <Typography fontWeight="bold" sx={{ mt: 2 }}>
          Car Name
        </Typography>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography fontWeight="bold">Description</Typography>
        <TextField
          sx={{ whiteSpace: "pre-wrap" }}
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
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
            label="Brand"
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
            label={t("Category")}
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
              value={color.isAvailable ? "true" : "false"}
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

        <Typography fontWeight="bold" sx={{ mt: 2 }}>
          Features
        </Typography>
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
