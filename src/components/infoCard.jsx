import React from "react";
import { Paper, Typography, Button, Box, useTheme } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const InfoCard = ({ title, description, Svg, sx, onclick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const bgColor = isDark ? "#1E293B" : "#E3F2FD";
  const textColor = isDark ? "#E0E7FF" : "#222";
  const descColor = isDark ? "#A5B4FC" : "#555";
  const btnColor = isDark ? "#60A5FA" : "#1E40AF";

  return (
    <Paper
    
      sx={{
        p: 5,
        overflowY: "visible",
        width: { xs: "100%", sm: "49%" },
        bgcolor: bgColor,
        borderRadius: 2,
        textAlign: "center",
        position: "relative", // Needed for absolute positioning of SVG
        overflow: "visible",
        ...sx,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: textColor, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: descColor, mb: 2 }}>{description}</Typography>
      <Button
        onClick={onclick}
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

      {/* Render SVG at the bottom right */}
      {/* {Svg && (
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            right: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Svg width={220} height={220} />
        </Box>
      )} */}
    </Paper>
  );
};

export default InfoCard;
