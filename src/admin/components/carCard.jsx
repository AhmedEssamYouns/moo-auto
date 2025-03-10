import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  useTheme,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminProductCard = ({ car, onEdit, onDelete }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
        bgcolor: isDarkMode ? "#1E1E1E" : "white",
        width: "100%",
        height: 180,
      }}
    >
      {/* Scrollable Images */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1,
          p: 1,
          maxWidth: 250,
          height: "100%",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {car.images.length > 0 ? (
          car.images.map((img, index) => (
            <CardMedia
              key={index}
              component="img"
              image={img}
              alt={car.name}
              sx={{
                width: 120,
                height: "100%",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          ))
        ) : (
          <CardMedia
            component="img"
            image="https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*"
            alt={car.name}
            sx={{
              width: 120,
              height: "100%",
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        )}
      </Box>

      {/* Car Details */}
      <CardContent sx={{ flexGrow: 1, px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: isDarkMode ? "white" : "black" }}>
          {car.name} - {car.model}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4CAF50", mt: 1 }}>
          EGP{car.price}
        </Typography>

        <Chip
          label={car.status === 1 ? "New" : "Used"}
          sx={{
            mt: 1,
            bgcolor: car.status === 1 ? "#4CAF50" : "#FFC107",
            color: car.status === 1 ? "white" : "black",
          }}
        />
      </CardContent>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 1 }}>
        <Button variant="contained" color="primary" onClick={() => onEdit(car.id)} startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(car.id)} startIcon={<DeleteIcon />}>
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
