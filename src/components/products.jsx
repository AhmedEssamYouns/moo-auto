import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";

const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    model: "2023",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "45,000",
    mileage: "10,000 Miles",
    fuel: "Electric",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "BMW X5",
    model: "2022",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "65,000",
    mileage: "5,000 Miles",
    fuel: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "BMW X5",
    model: "2022",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "65,000",
    mileage: "5,000 Miles",
    fuel: "Diesel",
    transmission: "Automatic",
  },
];

const BestSelling = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(max-width: 1500px)");
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: isDarkMode ? "white" : "black",
        }}
      >
        Best Selling Cars
      </Typography>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={car.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                overflow: "hidden",
                "&:hover": { boxShadow: 6 },
                bgcolor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={car.img}
                  alt={car.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Chip
                  label="Great Price"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: "#4CAF50",
                    color: "white",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: isDarkMode ? "#333" : "white",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  <BookmarkBorderIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {car.name} - {car.model}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    flexWrap: isTablet ? "wrap" : "nowrap",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  <Chip
                    icon={<SpeedIcon fontSize="small" />}
                    label={car.mileage}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
                      color: isDarkMode ? "white" : "black",
                      px: 0.5, // Less padding
                      minWidth: "auto", // Avoid extra width
                    }}
                  />
                  <Chip
                    icon={<LocalGasStationIcon fontSize="small" />}
                    label={car.fuel}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
                      color: isDarkMode ? "white" : "black",
                      px: 0.5,
                      minWidth: "auto",
                    }}
                  />
                  <Chip
                    icon={<DirectionsCarIcon fontSize="small" />}
                    label={car.transmission}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? "#424242" : "#E0E0E0",
                      color: isDarkMode ? "white" : "black",
                      px: 0.5,
                      minWidth: "auto",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#4CAF50" }}
                  >
                    EGP{car.price}
                  </Typography>
                  <Button
                    sx={{
                      color: isDarkMode ? "white" : "black",
                      textTransform: "none",
                    }}
                  >
                    View Details →
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSelling;
