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
  MenuItem,
  Grid,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { addRequest } from "../services/apis/carsServices";

const RequestCarScreen = () => {
  const { t } = useLanguage();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    modelYear: "",
    color: "",
    brand: "",
    model: "",
    transmission: "",
    price: "",
    additionalInfo: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRequest({
        ...formData,
        transmission: Number(formData.transmission),
        modelYear: Number(formData.modelYear),
        price: Number(formData.price),
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        modelYear: "",
        color: "",
        brand: "",
        model: "",
        transmission: "",
        price: "",
        additionalInfo: "",
      });
    } catch (err) {
      setError(t("somethingWentWrong"));
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          p: 4,
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          {t("requestCar")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Personal Info - Full Width */}
            <Grid item xs={12}>
              <TextField fullWidth label={t("yourName")} name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label={t("email")} name="email" type="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label={t("phoneNumber")} name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
            </Grid>

            {/* Car Details - Two Columns */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t("modelYear")} name="modelYear" type="number" value={formData.modelYear} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t("color")} name="color" value={formData.color} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t("brand")} name="brand" value={formData.brand} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t("model")} name="model" value={formData.model} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label={t("Transmission")} name="transmission" value={formData.transmission} onChange={handleChange} required>
                <MenuItem value="1">{t("manual")}</MenuItem>
                <MenuItem value="2">{t("automatic")}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t("price")} name="price" type="number" value={formData.price} onChange={handleChange} required />
            </Grid>

            {/* Additional Info - Full Width */}
            <Grid item xs={12}>
              <TextField fullWidth label={t("additionalInfo")} name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} multiline rows={3} />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {t("submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">{t("thankYouMessage")}</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestCarScreen;
