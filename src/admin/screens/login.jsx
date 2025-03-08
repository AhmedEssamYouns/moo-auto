import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postLogin } from "../services/adminServices";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email.trim() ? "" : "Email is required";
    tempErrors.password = formData.password.trim() ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    setLoading(true);
    setApiError("");
    setSuccessMessage("");
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
      
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Login failed!");
        }
      
        setSuccessMessage("Login successful! Redirecting...");
        console.log("API Response:", data);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
        navigate("/admin/cars");
        }, 500);
      } catch (error) {
        console.log("Fetch Error:", error);
        setApiError(error.message);
      }
      
      setLoading(false);
    };      
  
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {apiError && <Alert severity="error">{apiError}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>

    </Container>
  );
};

export default Login;
