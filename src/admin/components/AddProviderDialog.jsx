import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";

const AddProviderDialog = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState(false); // Track form errors

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!name || !image) {
      setFormError(true); // Set form error if fields are empty
      return;
    }

    onSubmit(name, image);
    setName("");
    setImage(null);
    setFormError(false); // Reset error state after successful submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Provider</DialogTitle>
      <DialogContent>
        <TextField
          label="Provider Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={formError && !name} // Show error if the name is empty
          sx={{ marginBottom: 2 }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: '16px', display: 'block' }}
        />
        {formError && (!name || !image) && (
          <Typography color="error" variant="body2">
            Both fields are required!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Provider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProviderDialog;
