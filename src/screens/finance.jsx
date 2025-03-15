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
  const { t, language } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
  const [monthFilter, setMonthFilter] = useState([6, 36]); // Default filter range (6 to 36 months)
  const [interestFilter, setInterestFilter] = useState(0); // Default interest filter
  const [feeFilter, setFeeFilter] = useState(0); // Default processing fee filter

  const [maxMonths, setMaxMonths] = useState(36); // Default max

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);

        // Calculate max months dynamically
        const allMonths = response.flatMap((provider) =>
          provider.installmentPlans.map((plan) => plan.months)
        );

        const maxAvailableMonths = Math.max(...allMonths);
        setMaxMonths(maxAvailableMonths);

        // Adjust the default filter range if needed
        setMonthFilter([6, maxAvailableMonths]);
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
  const handleInterestFilterChange = (event, newValue) => {
    setInterestFilter(newValue);
  };

  // Handle Fee Filter Change
  const handleFeeFilterChange = (event, newValue) => {
    setFeeFilter(newValue);
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
        plan.interest >= interestFilter &&
        plan.processingFee <= feeFilter
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
        valueLabelFormat={(value) => `${value}`}
        min={6}
        max={maxMonths} // Dynamically set max value
        step={12}
        marks={Array.from({ length: (maxMonths - 6) / 6 + 1 }, (_, i) => ({
          value: 6 + i * 6,
          label: `${6 + i * 6}`,
        }))}
        sx={{ mb: 3 }}
      />

      {/* Interest Filter */}
      <Typography variant="h6" gutterBottom>
        {t("Filter by Interest (%)")}
      </Typography>
      <Slider
        value={interestFilter}
        onChange={handleInterestFilterChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
        min={0}
        max={20}
        step={1}
        marks={[
          { value: 0, label: "0%" },
          { value: 5, label: "5%" },
          { value: 10, label: "10%" },
          { value: 15, label: "15%" },
          { value: 20, label: "20%" },
        ]}
        sx={{ mb: 3 }}
      />

      {/* Processing Fee Filter */}
      {/* <Typography variant="h6" gutterBottom>
        {t("Filter by Processing Fee (%)")}
      </Typography> */}
      {/* <Slider
        value={feeFilter}
        onChange={handleFeeFilterChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
        min={0}
        max={5}
        step={0.5}
        marks={[
          { value: 0, label: "0%" },
          { value: 1, label: "1%" },
          { value: 2, label: "2%" },
          { value: 3, label: "3%" },
          { value: 4, label: "4%" },
          { value: 5, label: "5%" },
        ]}
        sx={{ mb: 3 }}
      /> */}

      {/* Table Container */}

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
                                <TableCell
                                  dir={language === "en" ? "ltr" : "rtl"}
                                >
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
