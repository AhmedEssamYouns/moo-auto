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
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const InstallmentServicesScreen = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    installmentPlan: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  const installmentPlans = [
    { id: 1, title: t("6 Months Plan"), details: t("0% interest, fast approval") },
    { id: 2, title: t("12 Months Plan"), details: t("Low monthly payments") },
    { id: 3, title: t("24 Months Plan"), details: t("Best for long-term affordability") },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        {t("Installment Services")}
      </Typography>
      
      <Grid container spacing={3}>
        {installmentPlans.map((plan) => (
          <Grid item xs={12} sm={4} key={plan.id}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{plan.title}</Typography>
                <Typography variant="body2" color="textSecondary">{plan.details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          p: 3,
          mt: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {t("Apply for Installment Plan")}
        </Typography>
        
        <TextField
          fullWidth
          label={t("Full Name")}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label={t("Phone Number")}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label={t("Email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel translate="no">{t("Select Installment Plan")}</InputLabel>
          <Select
            name="installmentPlan"
            value={formData.installmentPlan}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          >
            {installmentPlans.map((plan) => (
              <MenuItem key={plan.id} value={plan.title}>{plan.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {t("Submit Application")}
        </Button>
      </Box>
      
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">{t("Your application has been submitted successfully. We will contact you soon!")}</Alert>
      </Snackbar>
    </Container>
  );
};

export default InstallmentServicesScreen;