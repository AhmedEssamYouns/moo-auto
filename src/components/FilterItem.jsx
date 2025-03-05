import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FilterItem = ({ icon, text, onClick }) => {
  const theme = useTheme();
  return (
    <Box
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
