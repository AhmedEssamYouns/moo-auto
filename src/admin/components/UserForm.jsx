import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  CircularProgress,
  OutlinedInput,
  Chip,
} from "@mui/material";

const rolesList = ["Admin", "Editor", "Owner"];
const passwordRules = ["At least 8 characters", "One uppercase letter", "One number", "One special character"];
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({ email: "", displayName: "", phoneNumber: "", password: "", roles: [] });
  const [errors, setErrors] = useState({});
  const [passwordTouched, setPasswordTouched] = useState(false);

  const inputRefs = {
    email: useRef(null),
    displayName: useRef(null),
    phoneNumber: useRef(null),
    roles: useRef(null),
    password: useRef(null),
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.displayName) newErrors.displayName = "Display name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password)) newErrors.password = "Password does not meet requirements";
    if (formData.roles.length === 0) newErrors.roles = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordTouched(true);
  };

  const handleRoleChange = (event) => {
    const selectedRoles = event.target.value;
    setFormData((prev) => ({
      ...prev,
      roles: selectedRoles.includes("Owner") ? ["Owner"] : selectedRoles,
    }));
  };

  const handleKeyDown = (event, fieldName) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const fieldNames = Object.keys(inputRefs);
      const currentIndex = fieldNames.indexOf(fieldName);
      const nextField = fieldNames[currentIndex + 1];

      if (nextField) {
        inputRefs[nextField].current?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) onSubmit(formData);
  };

  return (
    <>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, "email")}
        inputRef={inputRefs.email}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Display Name"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, "displayName")}
        inputRef={inputRefs.displayName}
        margin="normal"
        error={!!errors.displayName}
        helperText={errors.displayName}
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, "phoneNumber")}
        inputRef={inputRefs.phoneNumber}
        margin="normal"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />

      <FormControl fullWidth margin="normal" error={!!errors.roles}>
        <InputLabel>Roles</InputLabel>
        <Select
          multiple
          value={formData.roles}
          onChange={handleRoleChange}
          onKeyDown={(e) => handleKeyDown(e, "roles")}
          inputRef={inputRefs.roles}
          input={<OutlinedInput label="Roles" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((role) => (
                <Chip key={role} label={role} />
              ))}
            </Box>
          )}
        >
          {rolesList.map((role) => (
            <MenuItem key={role} value={role} disabled={formData.roles.includes("Owner") && role !== "Owner"}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.roles}</FormHelperText>
      </FormControl>

      <TextField
        fullWidth
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, "password")}
        inputRef={inputRefs.password}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />

      <Box mt={1}>
        <Typography variant="body2" color="textSecondary">
          Password must contain:
        </Typography>
        {passwordRules.map((rule, index) => {
          const isValid = passwordRegex.test(formData.password);
          return (
            <Typography key={index} variant="body2" color={passwordTouched ? (isValid ? "success.main" : "error.main") : "textSecondary"}>
              • {rule}
            </Typography>
          );
        })}
      </Box>

      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Save"}
      </Button>
    </>
  );
};

export default UserForm;
