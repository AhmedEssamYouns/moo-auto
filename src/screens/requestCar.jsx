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
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { addRequest } from "../services/apis/carsServices";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background: "linear-gradient(to bottom, #000000, #120000ff)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              fontFamily: "Michroma",
              color: "#B30000",
            }}
          >
            {t("requestCar")}
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.05)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {[
                  { label: t("yourName"), name: "name", type: "text" },
                  { label: t("email"), name: "email", type: "email" },
                  { label: t("phoneNumber"), name: "phoneNumber", type: "tel" },
                  { label: t("modelYear"), name: "modelYear", type: "number" },
                  { label: t("color"), name: "color", type: "text" },
                  { label: t("brand"), name: "brand", type: "text" },
                  { label: t("model"), name: "model", type: "text" },
                  { label: t("price"), name: "price", type: "number" },
                ].map((field, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={idx > 2 ? 6 : 12}
                    key={field.name}
                    component={motion.div}
                    variants={fadeUp}
                    custom={idx + 2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <TextField
                      fullWidth
                      required
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                <Grid
                  item
                  xs={12}
                  sm={6}
                  component={motion.div}
                  variants={fadeUp}
                  custom={10}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <TextField
                    select
                    fullWidth
                    label={t("Transmission")}
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="1">{t("manual")}</MenuItem>
                    <MenuItem value="2">{t("automatic")}</MenuItem>
                  </TextField>
                </Grid>

                <Grid
                  item
                  xs={12}
                  component={motion.div}
                  variants={fadeUp}
                  custom={11}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <TextField
                    fullWidth
                    label={t("additionalInfo")}
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  component={motion.div}
                  variants={fadeUp}
                  custom={12}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      background: "linear-gradient(135deg, #8B0000, #B22222)",
                      color: "#fff",
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(179, 0, 0, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #B22222, #8B0000)",
                      },
                    }}
                  >
                    {t("submit")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </motion.div>

        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">{t("thankYouMessage")}</Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError("")}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default RequestCarScreen;
