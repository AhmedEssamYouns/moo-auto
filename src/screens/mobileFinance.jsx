import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { getProviders } from "../admin/services/adminServices";

const MobileInstallmentScreen = () => {
  const { t } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState([6, 36]);
  const [maxMonths, setMaxMonths] = useState(36); // Default max value

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);

        // Find the maximum installment duration across all providers
        const allMonths = response.flatMap((provider) =>
          provider.installmentPlans.map((plan) => plan.months)
        );
        const maxAvailableMonths = Math.max(...allMonths, 6); // Default to 6 if no data
        setMaxMonths(maxAvailableMonths);

        // Adjust the default filter range
        setMonthFilter([6, maxAvailableMonths]);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthFilterChange = (event, newValue) => {
    setMonthFilter(newValue);
  };

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        {t("Installment Services")}
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        size="small"
        label={t("Search Providers")}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* Always Visible Filters */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          {t("Filter by Months")}
        </Typography>
        <Slider
          value={monthFilter}
          onChange={handleMonthFilterChange}
          valueLabelDisplay="auto"
          min={6}
          max={maxMonths} // Dynamically set max value
          step={6}
        />
      </Paper>

      {/* Display Providers */}
      {filteredProviders.length === 0 ? (
        <Typography variant="body1" textAlign="center" mt={3}>
          {t("No providers found")}
        </Typography>
      ) : (
        filteredProviders.map((provider) => {
          const validPlans = provider.installmentPlans.filter(
            (plan) => plan.months >= monthFilter[0] && plan.months <= monthFilter[1]
          );

          if (validPlans.length === 0) return null;

          return (
            <Card key={provider.id} sx={{ mb: 2, p: 2 }}>
              {/* Provider Header */}
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
                <Avatar
                  src={provider.imageUrl}
                  alt={provider.name}
                  sx={{ width: 50, height: 50 }}
                />
                <Typography fontWeight="bold" variant="h6">
                  {provider.name}
                </Typography>
              </Box>

              <Divider sx={{ mb: 1 }} />

              {/* Table-like Structure for Plans */}
              <CardContent sx={{ p: 0 }}>
                {/* Column Titles */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 1.5,
                    pb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ flex: 1 }}
                  >
                    {t("Months")}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ flex: 1, textAlign: "right" }}
                  >
                    {t("Interest (%)")}
                  </Typography>
                </Box>

                <Divider />

                {/* Installment Plans */}
                {validPlans.map((plan, index) => (
                  <Box
                    key={plan.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 1.5,
                      bgcolor: index % 2 === 0 ? "grey.100" : "transparent",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {plan.months}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ flex: 1, textAlign: "right" }}
                    >
                      {plan.interest}%
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default MobileInstallmentScreen;
