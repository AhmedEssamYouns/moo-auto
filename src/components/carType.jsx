import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// SVGs
import Convertible from "../assets/svgs/cars/convertable.svg";
import Coupe from "../assets/svgs/cars/coupe.svg";
import Electric from "../assets/svgs/cars/electric.svg";
import Hatchback from "../assets/svgs/cars/hatchback.svg";
import Hybrid from "../assets/svgs/cars/hyberd.svg";
import Sedan from "../assets/svgs/cars/sedan.svg";
import Suv from "../assets/svgs/cars/suv.svg";
import Truck from "../assets/svgs/cars/truck.svg";
import Van from "../assets/svgs/cars/van.svg";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const CarEnum = {
  sedan: 1,
  suv: 2,
  hatchback: 3,
  coupe: 4,
  convertible: 5,
  truck: 6,
  electric: 7,
  sports: 8,
};


const carTypes = [
  { key: "suv", icon: Suv },
  { key: "sedan", icon: Sedan },
  { key: "hatchback", icon: Hatchback },
  { key: "coupe", icon: Coupe },
  { key: "convertible", icon: Convertible },
  { key: "van", icon: Van },
  { key: "truck", icon: Truck },
  { key: "electric", icon: Electric },
];

export default function CarTypeSection() {
  const { t } = useLanguage();
  const ismobile = useMediaQuery("(max-width: 1200px)");
  const navigate = useNavigate();

  return (
    <Box px={{ xs: 2, md: 10 }} py={6} bgcolor="#fff" color="#111">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          {t("browse_by_type")}
        </Typography>
        <Button
          onClick={() => navigate("/cars-for-sale")}
          endIcon={<ArrowOutwardIcon />}
          sx={{ textTransform: "none", color: "#333" }}
        >
          {t("view_all")}
        </Button>
      </Box>
      {ismobile ? (
        <div
          style={{
            display: "flex",
            paddingBottom: "12px",
            flexWrap: "wrap",
            marginBottom: "22px",
            justifyContent: "space-between",
            padding: "0 12px",
            gap: "12px",
          }}
        >
          {carTypes.map(({ key, icon }) => (
            <div
              key={key}
              style={{
                width: "calc(50% - 6px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                cursor: "pointer",
                boxSizing: "border-box",
                transition: "background 0.3s",
              }}
              onClick={() =>
                navigate(`/cars-for-sale?type=${CarEnum[key]}`)
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <img
                src={icon}
                alt={key}
                style={{ width: 24, height: 24, objectFit: "contain" }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
            px={1}
            mb={6}
          >
            {carTypes.map(({ key, icon }) => (
              <Box
                key={key}
                px={3}
                py={2}
                border="1px solid #e0e0e0"
                borderRadius="12px"
                display="flex"
                alignItems="center"
                gap={1}
                onClick={() =>
                  navigate(`/cars-for-sale?type=${CarEnum[key]}`)
                }
                sx={{
                  cursor: "pointer",
                  width: { xs: "48%", sm: "auto" },
                  minWidth: { sm: 100 },
                  mb: 2,
                  transition: "all 0.3s",
                  ":hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <Avatar src={icon} alt={key} sx={{ width: 24, height: 24 }} />
                <Typography variant="body2" fontWeight={500}>
                  {t(key)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
      <Grid container spacing={4} alignItems="center">
        {!ismobile && (
          <Grid item xs={12} md={6}>
            <Box position="relative" height={320}>
              <Box
                component="img"
                src="https://www.motortrend.com/files/65a23c444cb19e00086d1175/002-2024-mercedes-benz-e450-4matic-front-three-quarters.jpg?w=768&width=768&q=75&format=webp"
                alt="main-car"
                sx={{
                  position: "absolute",
                  top: -30,
                  left: -10,
                  width: "40%",
                  height: 240,
                  borderRadius: 4,
                  objectFit: "cover",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              />
              <Box
                component="img"
                borderRadius={20}
                src="https://www.edmunds.com/assets/m/cs/blt34061a0118f3c775/66930450d0c0ef0c7ec5473a/2024_ferrari_purosangue_action_3_1600.jpg"
                alt="right-car"
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 50,
                  width: "50%",
                  height: 320,
                  borderRadius: 4,
                  objectFit: "fill",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              />
              <Box
                component="img"
                src="https://e7852c3a.delivery.rocketcdn.me/wp-content/uploads/2023/12/Mercedes-AMG.jpg"
                alt="bottom-car"
                sx={{
                  position: "absolute",
                  bottom: -50,
                  left: 50,
                  width: "28%",
                  height: 140,
                  borderRadius: 4,
                  objectFit: "cover",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {t("cta_title")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
            {t("cta_description")}
          </Typography>

          <Stack spacing={1.5} mb={3}>
            <Typography display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon fontSize="small" sx={{ color: "#4caf50" }} />
              {t("cta_point_1")}
            </Typography>
            <Typography display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon fontSize="small" sx={{ color: "#4caf50" }} />
              {t("cta_point_2")}
            </Typography>
            {/* <Typography display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon fontSize="small" sx={{ color: "#4caf50" }} />
              {t("cta_point_3")}
            </Typography> */}
          </Stack>

          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            onClick={() => navigate("/cars-for-sale")}
            sx={{
              backgroundColor: "#111",
              ":hover": { backgroundColor: "#333" },
            }}
          >
            {t("get_started")}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={16}>
        {[
          { value: "836M", label: t("cars_for_sale") },
          { value: "738M", label: t("dealer_reviews") },
          { value: "100M", label: t("visitors_per_day") },
          { value: "238M", label: t("verified_dealers") },
        ].map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Typography variant="h6" fontWeight="bold">
              {item.value}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
