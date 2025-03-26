import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";


const CATEGORY_OPTIONS = [
  { label: "Sedan", value: 1 },
  { label: "SUV", value: 2 },
  { label: "Hatchback", value: 3 },
  { label: "Coupe", value: 4 },
  { label: "Convertible", value: 5 },
  { label: "Truck", value: 6 },
  { label: "Electric", value: 7 },
  { label: "Sports", value: 8 },
];

const CarForm = ({ onSubmit, brandData }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      brandId: "",
      transmission: "",
      price: "",
      model: "",
      name: "",
      colors: [{ color: "", isAvailable: true }],
      features: [{ name: "", value: "" }],
      status: "",
      images: [],
      description: "",
      category: "",
    },
  });

  const { fields: colorFields, append: addColor, remove: removeColor } =
    useFieldArray({
      control,
      name: "colors",
    });

  const { fields: featureFields, append: addFeature, remove: removeFeature } =
    useFieldArray({
      control,
      name: "features",
    });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
    setValue("images", [...selectedImages, ...files]);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setValue("images", newImages);
  };
  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("brandId", data.brandId);
    formData.append("transmission", data.transmission);
    formData.append("price", data.price);
    formData.append("model", data.model);
    formData.append("name", data.name);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("category", data.category);
  
    // Append colors properly
    data.colors.forEach((color, index) => {
      formData.append(`colors[${index}].color`, color.color);
      formData.append(`colors[${index}].isAvailable`, color.isAvailable);
    });
  
    // Append features properly
    data.features.forEach((feature, index) => {
      formData.append(`features[${index}].name`, feature.name);
      formData.append(`features[${index}].value`, feature.value);
    });
  
    // Append images with correct format `images[0]`, `images[1]`, etc.
    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  
    onSubmit(formData);
  };
  
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" fullWidth required />
        )}
      />

      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth required>
              {brandData.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name="model"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Model" type="number" fullWidth required />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Price" type="number" fullWidth required />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Description" multiline rows={3} fullWidth required />
        )}
      />

      <FormControl fullWidth>
        <InputLabel>Transmission</InputLabel>
        <Controller
          name="transmission"
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth required>
              <MenuItem value={2}>Automatic</MenuItem>
              <MenuItem value={1}>Manual</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth required>
              <MenuItem value={1}>New</MenuItem>
              <MenuItem value={2}>Used</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
  <InputLabel>Category</InputLabel>
  <Controller
    name="category"
    control={control}
    render={({ field }) => (
      <Select {...field} fullWidth required>
        {CATEGORY_OPTIONS.map((category) => (
          <MenuItem key={category.value} value={category.value}>
            {category.label}
          </MenuItem>
        ))}
      </Select>
    )}
  />
</FormControl>

      <Typography variant="h6">Colors</Typography>
      {colorFields.map((color, index) => (
        <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Controller
            name={`colors.${index}.color`}
            control={control}
            render={({ field }) => <TextField {...field} label="Color" fullWidth required />}
          />
          <Controller
            name={`colors.${index}.isAvailable`}
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth required>
                <MenuItem value={true}>Available</MenuItem>
                <MenuItem value={false}>Not Available</MenuItem>
              </Select>
            )}
          />
          <IconButton onClick={() => removeColor(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => addColor({ color: "", isAvailable: true })}>Add Color</Button>

      <Typography variant="h6">Features</Typography>
      {featureFields.map((feature, index) => (
        <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Controller
            name={`features.${index}.name`}
            control={control}
            render={({ field }) => <TextField {...field} label="Feature Name" fullWidth required />}
          />
          <Controller
            name={`features.${index}.value`}
            control={control}
            render={({ field }) => <TextField {...field} label="Feature Value" fullWidth required />}
          />
          <IconButton onClick={() => removeFeature(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => addFeature({ name: "", value: "" })}>Add Feature</Button>

      {/* Image Upload */}
      <Box>
        <Button variant="contained" component="label">
          Upload Images
          <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
        </Button>
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {selectedImages.map((image, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img src={URL.createObjectURL(image)} alt="Car" width={100} height={100} style={{ borderRadius: 5 }} />
              <Chip label="Remove" onClick={() => removeImage(index)} sx={{ bgcolor: "red", color: "white" }} />
            </Box>
          ))}
        </Box>
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CarForm;
