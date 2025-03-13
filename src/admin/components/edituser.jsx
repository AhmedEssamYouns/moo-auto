import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  OutlinedInput,
  Chip,
  FormHelperText,
} from "@mui/material";
import { editUser } from "../services/adminServices";

const roleOptions = ["Admin", "Editor", "Owner"];

const passwordRules = [
  "At least 8 characters",
  "One uppercase letter",
  "One number",
  "One special character",
];

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const EditUserDialog = ({ open, onClose, user,isOwner, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    displayName: "",
    phoneNumber: "",
    password: "",
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        password: user.password || "",
        roles: user.roles.map((role) => ({
          name: role,
          isSelected: true, // Assuming all roles are selected by default
        })),
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (event) => {
    const selectedRoles = event.target.value;
    setFormData((prev) => ({
      ...prev,
      roles: roleOptions.map((role) => ({
        name: role,
        isSelected: selectedRoles.includes(role),
      })),
    }));
  };

  const handleSubmit = async () => {
    if (formData.password && !passwordRegex.test(formData.password)) {
      setPasswordError("Password does not meet the required criteria.");
      return;
    }

    setPasswordError(""); // Reset password error if it's valid

    // Remove password from formData if it's empty
    const payload = formData.password ? formData : { ...formData, password: undefined };

    // Transform roles to match the required format
    const transformedRoles = formData.roles.map((role) => ({
      name: role.name,
      isSelected: role.isSelected,
    }));

    const finalPayload = {
      ...payload,
      roles: transformedRoles,
    };

    setLoading(true);
    try {
      await editUser(user.id, finalPayload);
      onEditSuccess();
      onClose();
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Display Name"
            name="displayName"
            fullWidth
            value={formData.displayName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Leave blank to keep current password"
            value={formData.password}
            onChange={handleChange}
            error={!!passwordError}
            helperText={passwordError || ""}
          />
          <FormControl fullWidth disabled={isOwner == user.id}>
            <InputLabel>Roles</InputLabel>
            <Select
              multiple
              value={formData.roles.filter((role) => role.isSelected).map((role) => role.name)}
              onChange={handleRoleChange}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((role) => (
                    <Chip key={role} label={role} />
                  ))}
                </Box>
              )}
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role} disabled={formData.roles.some((r) => r.name === "Owner" && r.isSelected) && role !== "Owner"}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Display password rules */}
          <Box mt={2}>
            {passwordRules.map((rule, index) => (
              <Box key={index} display="flex" alignItems="center">
                <Chip label={rule} size="small" />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
