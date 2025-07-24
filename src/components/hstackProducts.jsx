import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { useLatestCars } from "../services/hooks/useCards";
import ProductCard from "./productItem";
import { motion } from "framer-motion";
import LargeCarCard from "./smartCard";

const HorizontalShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useLanguage();
  const { data: cars, isLoading } = useLatestCars();
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (cars?.length) {
      setSelected(cars[0].id);
      scrollToCard(cars[0].id);
    }
  }, [cars]);

  const scrollToCard = (id) => {
    const node = itemRefs.current[id];
    if (node && node.scrollIntoView) {
      node.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    setSelected(id);
  };

  if (isLoading) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="primary" size={50} thickness={4} />
      </Box>
    );
  }

  if (!cars?.length) {
    return null;
  }

  return (
    <Box
      sx={{
        pt: 10,
        pb: 6,
        minHeight: "75vh",
        backgroundColor: "#ffffff",
      }}
    >
      {cars?.length > 0 ? (
        <>
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              pb: 2,
              px: isMobile ? 1 : 3,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {cars.map((car) => (
              <Box
                key={car.id}
                ref={(el) => (itemRefs.current[car.id] = el)}
                sx={{
                  flex: "0 0 auto",
                  width: isMobile ? "85%" : "auto",
                  px: isMobile ? 1 : 2,
                }}
              >
                <motion.div>
                  <LargeCarCard car={car} />
                </motion.div>
              </Box>
            ))}
          </Box>

          <Box display="flex" justifyContent="center" mt={3} gap={1}>
            {cars.map((car) => (
              <IconButton
                key={car.id}
                size="small"
                onClick={() => scrollToCard(car.id)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: selected === car.id ? "black" : "#aaa",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              />
            ))}
          </Box>
        </>
      ) : (
        <Typography
          variant="h6"
          mt={10}
          sx={{ textAlign: "center", width: "100%", color: "#333" }}
        >
          {t("noCarsAvailable") || "No Cars Available"}
        </Typography>
      )}
    </Box>
  );
};

export default HorizontalShowcase;
