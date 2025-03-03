import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";

const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    model: "2023",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "$45,000",
    brand: "Tesla",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "BMW X5",
    model: "2022",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "$65,000",
    brand: "BMW",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "Toyota Corolla",
    model: "2021",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "$25,000",
    brand: "Toyota",
    transmission: "Manual",
  },
  {
    id: 4,
    name: "Mercedes C-Class",
    model: "2023",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x3-m50-165-673658ffda8c2.jpg?crop=0.814xw:0.916xh;0.0849xw,0.0841xh&resize=768:*",
    price: "$55,000",
    brand: "Mercedes",
    transmission: "Automatic",
  },
];
const BestSelling = () => {
    return (
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
        >
          Best Selling Cars
        </Typography>
        <Grid container spacing={3}>
          {cars.map((car) => (
           <Grid item xs={12} sm={63} md={4} lg={3} key={car.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={car.img}
                  alt={car.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {car.name} ({car.model})
                  </Typography>
                  <Typography sx={{ color: "gray", fontSize: 14, mb: 1 }}>
                    <strong>Brand:</strong> {car.brand}
                  </Typography>
  
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={`Price: ${car.price}`}
                      sx={{ bgcolor: "#E3F2FD", color: "#1976D2" }}
                    />
                    <Chip
                      icon={<SpeedIcon />}
                      label={`Transmission: ${car.transmission}`}
                      sx={{ bgcolor: "#FFEBEE", color: "#D32F2F" }}
                    />
                    <Chip
                      icon={<BuildIcon />}
                      label={`Model: ${car.model}`}
                      sx={{ bgcolor: "#E8F5E9", color: "#388E3C" }}
                    />
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