import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

const InfoCard = ({ bgColor, title, description, btn, Svg }) => {
  return (
    <Paper
      sx={{
        p: 5,
        width: { xs: "100%", sm: "49%" },
        bgcolor: bgColor,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#222", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "#555", mb: 2 }}>{description}</Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: btn,
          px: 3,
          py: 2,
          color: "white",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        Get Started
      </Button>
    </Paper>
  );
};

export default InfoCard;
