import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Slider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { getProviders } from "../admin/services/adminServices";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MobileInstallmentList from "./mobileFinance";

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

const InstallmentServicesScreen = () => {
  const { t, language } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
  const [monthFilter, setMonthFilter] = useState([6, 36]);
  const [interestFilter, setInterestFilter] = useState(0);
  const [feeFilter, setFeeFilter] = useState(0);
  const [maxMonths, setMaxMonths] = useState(36);

  const isMobile = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
        const allMonths = response.flatMap((p) =>
          p.installmentPlans.map((plan) => plan.months)
        );
        const maxAvailableMonths = Math.max(...allMonths);
        setMaxMonths(maxAvailableMonths);
        setMonthFilter([6, maxAvailableMonths]);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMonthFilterChange = (e, newValue) => setMonthFilter(newValue);
  const handleInterestFilterChange = (e, newValue) => setInterestFilter(newValue);

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlans = (provider) =>
    provider.installmentPlans.filter(
      (plan) =>
        plan.months >= monthFilter[0] &&
        plan.months <= monthFilter[1] &&
        plan.interest >= interestFilter &&
        plan.processingFee <= feeFilter
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileInstallmentList />
        ) : (
          <>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
                fontFamily="Michroma, sans-serif"
                textAlign="center"
                color="#d32f2f"
              >
                {t("Installment Services")}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
              <TextField
                fullWidth
                label={t("Search Providers")}
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  mb: 4,
                  input: { color: "#333" },
                  label: { color: "#555" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                  },
                }}
              />
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}>
              <Typography variant="h6" fontWeight="bold" mb={1} color="#333">
                {t("Filter by Months")}
              </Typography>
              <Slider
                value={monthFilter}
                onChange={handleMonthFilterChange}
                valueLabelDisplay="auto"
                min={6}
                max={maxMonths}
                step={6}
                marks={Array.from({ length: (maxMonths - 6) / 6 + 1 }, (_, i) => ({
                  value: 6 + i * 6,
                  label: `${6 + i * 6}`,
                }))}
                sx={{ mb: 4 }}
              />
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
              <Typography variant="h6" fontWeight="bold" mb={1} color="#333">
                {t("Filter by Interest (%)")}
              </Typography>
              <Slider
                value={interestFilter}
                onChange={handleInterestFilterChange}
                valueLabelDisplay="auto"
                min={0}
                max={20}
                step={1}
                marks={[0, 5, 10, 15, 20].map((v) => ({ value: v, label: `${v}%` }))}
                sx={{ mb: 4 }}
              />
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 4,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "1px solid #eee",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{t("Provider")}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{t("Installment Plan")}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{t("Months")}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{t("Interest (%)")}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{t("Processing Fee (%)")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProviders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1" color="#666">
                            {t("No providers found")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProviders.map((provider) => {
                        const plans = filteredPlans(provider);
                        if (plans.length === 0) return null;

                        return (
                          <TableRow key={provider.id}>
                            <TableCell>
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                  <Avatar
                                    src={provider.imageUrl}
                                    alt={provider.name}
                                    sx={{ width: 40, height: 40 }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography fontWeight="medium" color="#333">
                                    {provider.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell colSpan={4}>
                              <Accordion
                                sx={{
                                  mt: 2,
                                  borderRadius: 2,
                                  backgroundColor: "#f9f9f9",
                                  color: "#333",
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                }}
                              >
                                <AccordionSummary expandIcon={<ArrowDropDownIcon sx={{ color: "#333" }} />}>
                                  <Typography fontWeight="medium">{t("View Installment Plans")}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>{t("Plan")}</TableCell>
                                        <TableCell>{t("Months")}</TableCell>
                                        <TableCell>{t("Interest (%)")}</TableCell>
                                        <TableCell>{t("Processing Fee (%)")}</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {plans.map((plan) => (
                                        <TableRow key={plan.id}>
                                          <TableCell dir={language === "en" ? "ltr" : "rtl"}>
                                            {language === "en"
                                              ? `${plan.months} Months Plan`
                                              : `${plan.months} اشهر`}
                                          </TableCell>
                                          <TableCell>{plan.months}</TableCell>
                                          <TableCell>{plan.interest}</TableCell>
                                          <TableCell>{plan.processingFee}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </AccordionDetails>
                              </Accordion>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>

            <Snackbar
              open={success}
              autoHideDuration={4000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success" onClose={() => setSuccess(false)}>
                {t("Your application has been submitted successfully. We will contact you soon!")}
              </Alert>
            </Snackbar>
          </>
        )}
      </Container>
    </Box>
  );
};

export default InstallmentServicesScreen;
