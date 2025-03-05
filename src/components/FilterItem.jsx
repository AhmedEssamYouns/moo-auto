import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FilterItem = ({ icon, text, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
      p={1}
      borderRadius={5}
      px={1}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        "&:hover": { color: theme.palette.primary.main },
      }}
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{text}</Typography>
    </Box>
  );
};

export default FilterItem;
