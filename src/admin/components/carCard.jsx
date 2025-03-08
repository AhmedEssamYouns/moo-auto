import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";

const AdminProductCard = ({ car, onEdit, onDelete }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);


  return (
    <Card
      sx={{
        borderRadius: 3,
        height: 400,
        boxShadow: 3,
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
        bgcolor: isDarkMode ? "#1E1E1E" : "white",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={
            car.images[0] ||
            "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*"
          }
          alt={car.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Chip
          label={car.status === 1 ? "New" : "Used"}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: car.status === 1 ? "#4CAF50" : "#FFC107",
            color: car.status === 1 ? "white" : "black",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: isDarkMode ? "white" : "black" }}
        >
          {car.name} - {car.model}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#4CAF50", mt: 1 }}
        >
          EGP{car.price}
        </Typography>
      </CardContent>

      {/* Action Buttons - Always at the bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          width: "100%",
          px: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(car.id)}
          startIcon={<EditIcon />}
          fullWidth
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(car.id)}
          startIcon={<DeleteIcon />}
          fullWidth
        >
          Delete
        </Button>
      </Box>

      {/* Snackbar for Copy Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default AdminProductCard;
