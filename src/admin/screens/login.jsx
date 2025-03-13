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
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import logo from "../../assets/imgs/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email.trim() ? "" : "Email is required";
    tempErrors.password = formData.password.trim()
      ? ""
      : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current.focus();
      } else {
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed!");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      if (data.roles[0]) {
        localStorage.setItem("role", data.roles[0]);
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          userName: data.userName,
          displayName: data.displayName,
          phoneNumber: data.phoneNumber,
          roles: data.roles,
        })
      );

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => window.location.replace("/admin/cars"), 500);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <img
          src={logo}
          alt="Admin Logo"
          style={{ width: "100%", height: "auto", borderRadius: "22px" }}
        />
      </Box>
      <Paper
        elevation={5}
        sx={{
          p: 4,
          mt: 5,
          textAlign: "center",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={logo}
            alt="Admin Logo"
            style={{ width: 120, height: "auto" }}
          />
        </Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Login
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {apiError && <Alert severity="error">{apiError}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            inputRef={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
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
            inputRef={passwordRef}
            onKeyDown={(e) => handleKeyDown(e, null)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
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
            sx={{ mt: 3, borderRadius: "8px", fontWeight: "bold" }}
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
