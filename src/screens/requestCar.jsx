import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const RequestCarScreen = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    carName: "",
    carModel: "",
    carColor: "",
    userName: "",
    phoneNumber: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({   carName: "",
        carModel: "",
        carColor: "",
        userName: "",
        phoneNumber: "",
        email: "",
      });
    setSuccess(true);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          p: 3,
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          {t("requestCar")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("carName")}
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label={t("carModel")}
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label={t("carColor")}
            name="carColor"
            value={formData.carColor}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label={t("yourName")}
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label={t("phoneNumber")}
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label={t("email")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="dense"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {t("submit")}
          </Button>
        </form>
      </Box>
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">{t("thankYouMessage")}</Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestCarScreen;
