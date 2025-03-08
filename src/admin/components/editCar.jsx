import React, { useState } from "react";
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
} from "@mui/material";
import { useCar } from "../../services/hooks/useCards";

const CarEditForm = ({ open, onClose, id }) => {
  const { data: car, isLoading } = useCar(id);
  const [formData, setFormData] = useState(null);

  React.useEffect(() => {
    if (car) {
      setFormData(car);
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <TextField
          label="Car Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          type="number"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value={1}>New</MenuItem>
            <MenuItem value={2}>Used</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarEditForm;
