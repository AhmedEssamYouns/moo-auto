import React from "react";
import { Paper, Typography, Button, Box, useTheme } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const InfoCard = ({ title, description, Svg , sx }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const bgColor = isDark ? "#1E293B" : "#E3F2FD"; // Dark Blue for dark mode, Soft Blue for light mode
  const textColor = isDark ? "#E0E7FF" : "#222"; // Light text in dark mode, dark text in light mode
  const descColor = isDark ? "#A5B4FC" : "#555"; // Softer text for readability
  const btnColor = isDark ? "#60A5FA" : "#1E40AF"; // Adjusted button colors

  return (
    <Paper
      sx={{
        p: 5,
        width: { xs: "100%", sm: "49%" },
        bgcolor: bgColor,
        borderRadius: 2,
        textAlign: "center",
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: textColor, mb: 1 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: descColor, mb: 2 }}>{description}</Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: btnColor,
          px: 3,
          py: 2,
          color: "white",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        {t("getStarted")}
      </Button>
    </Paper>
  );
};

export default InfoCard;
