import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  FormHelperText,
  Box,
  Alert,
} from "@mui/material";
import { addUser } from "../services/adminServices";
import { useUsers } from "../hooks/useAdmin";

const rolesList = ["Admin", "Editor", "Owner"];

const passwordRules = [
  "At least 8 characters",
  "At least one uppercase letter",
  "At least one number",
  "At least one special character",
];

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ModifyUserScreen = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phoneNumber: "",
    password: "",
    roles: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.displayName)
      newErrors.displayName = "Display name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password does not meet requirements";
    }
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
    setFormData((prev) => ({ ...prev, roles: [event.target.value] }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await addUser(formData);
      setOpen(false);
      refetch();
    } catch (err) {
      alert(err.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Users
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error || !users || users.length === 0 ? (
        <Typography color="error">No users found</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText
                primary={user.displayName}
                secondary={`${user.email} - ${user.roles.join(", ")}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modify User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />

          <FormControl fullWidth margin="normal" error={!!errors.roles}>
            <InputLabel>Role</InputLabel>
            <Select
              name="roles"
              value={formData.roles[0] || ""}
              onChange={handleRoleChange}
            >
              {rolesList.map((role) => (
                <MenuItem key={role} value={role}>
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
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Password rules UI */}
          <Box mt={1}>
            <Typography variant="body2" color="textSecondary">
              Password must contain:
            </Typography>
            {passwordRules.map((rule, index) => {
              const isValid = new RegExp(passwordRegex.source).test(
                formData.password
              );
              return (
                <Typography
                  key={index}
                  variant="body2"
                  color={
                    passwordTouched
                      ? isValid
                        ? "success.main"
                        : "error.main"
                      : "textSecondary"
                  }
                >
                  • {rule}
                </Typography>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ModifyUserScreen;
