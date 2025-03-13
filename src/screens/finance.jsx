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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { getProviders } from "../admin/services/adminServices";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const InstallmentServicesScreen = () => {
  const { t } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
  const [monthFilter, setMonthFilter] = useState([6, 36]); // Default filter range (6 to 36 months)
  const [interestFilter, setInterestFilter] = useState(""); // Filter for interest
  const [feeFilter, setFeeFilter] = useState(""); // Filter for processing fee

  // Fetch Providers and Installment Plans from API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  // Handle Search Change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Month Filter Change
  const handleMonthFilterChange = (event, newValue) => {
    setMonthFilter(newValue);
  };

  // Handle Interest Filter Change
  const handleInterestFilterChange = (event) => {
    setInterestFilter(event.target.value);
  };

  // Handle Fee Filter Change
  const handleFeeFilterChange = (event) => {
    setFeeFilter(event.target.value);
  };

  // Filter providers based on the search term and month range
  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter installment plans based on month range, interest, and fee
  const filteredPlans = (provider) => {
    return provider.installmentPlans.filter(
      (plan) =>
        plan.months >= monthFilter[0] &&
        plan.months <= monthFilter[1] &&
        (interestFilter ? plan.interest === interestFilter : true) &&
        (feeFilter ? plan.processingFee === feeFilter : true)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        {t("Installment Services")}
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        label={t("Search Providers")}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      {/* Month Slider Filter */}
      <Typography variant="h6" gutterBottom>
        {t("Filter by Months")}
      </Typography>
      <Slider
        value={monthFilter}
        onChange={handleMonthFilterChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} months`}
        min={6}
        max={36}
        step={6}
        marks={[
          { value: 6, label: "6 months" },
          { value: 12, label: "12 months" },
          { value: 18, label: "18 months" },
          { value: 24, label: "24 months" },
          { value: 30, label: "30 months" },
          { value: 36, label: "36 months" },
        ]}
        sx={{ mb: 3 }}
      />

      {/* Interest Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{t("Filter by Interest (%)")}</InputLabel>
        <Select
          value={interestFilter}
          onChange={handleInterestFilterChange}
          label={t("Filter by Interest (%)")}
        >
          <MenuItem value="">{t("All")}</MenuItem>
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={10}>10%</MenuItem>
          <MenuItem value={15}>15%</MenuItem>
        </Select>
      </FormControl>

      {/* Processing Fee Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{t("Filter by Processing Fee (%)")}</InputLabel>
        <Select
          value={feeFilter}
          onChange={handleFeeFilterChange}
          label={t("Filter by Processing Fee (%)")}
        >
          <MenuItem value="">{t("All")}</MenuItem>
          <MenuItem value={1}>1%</MenuItem>
          <MenuItem value={2}>2%</MenuItem>
          <MenuItem value={3}>3%</MenuItem>
        </Select>
      </FormControl>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="installment services table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Provider")}</TableCell>
              <TableCell>{t("Installment Plan")}</TableCell>
              <TableCell>{t("Months")}</TableCell>
              <TableCell>{t("Interest (%)")}</TableCell>
              <TableCell>{t("Processing Fee (%)")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProviders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body1" align="center">
                    {t("No providers found")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProviders.map((provider) => {
                const plans = filteredPlans(provider);

                // Skip rendering provider if no plans match filter
                if (plans.length === 0) return null;

                return (
                  <TableRow key={provider.id}>
                    <TableCell component="th" scope="row">
                      {/* Display Provider Image */}
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar
                            src={provider.imageUrl}
                            alt={provider.name}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Grid>
                        <Grid item>{provider.name}</Grid>
                      </Grid>
                    </TableCell>
                    <TableCell colSpan={4}>
                      {/* Expandable Section for Installment Plans */}
                      <Accordion sx={{ mt: 2 }}>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                          <Typography>{t("View Installment Plans")}</Typography>
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
                                  <TableCell>
                                    {t(`${plan.months} Months Plan`)}
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

      {/* Snackbar for success message */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          {t(
            "Your application has been submitted successfully. We will contact you soon!"
          )}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InstallmentServicesScreen;
