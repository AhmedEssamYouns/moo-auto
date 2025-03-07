import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  WhatsApp,
  PhoneInTalk,
  Instagram,
} from "@mui/icons-material";
import logo from "../assets/imgs/logo.png";
import { FaTiktok } from "react-icons/fa"; // Use react-icons for TikTok
import { useLanguage } from "../contexts/LanguageContext";

const Footer = ({ darkMode }) => {
  const { t } = useLanguage(); // Translation function

  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        mt: 4,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          {/* Left Section - Text Logo */}
          <Grid item xs={12} md={3}>
            <Box
              component={Link}
              to="/"
              sx={{
                width: 250,
                my: 2,
                alignSelf: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logo}
                alt="Al Muslmi Logo"
                style={{ width: "100%", height: "100%", borderRadius: 45 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Quick Links")}
                </Typography>
                <Box>
                  <Link
                    href="/cars-for-sale"
                    sx={{ display: "block", color: "inherit" }}
                  >
                    {t("Cars for Sale")}
                  </Link>
                  <Link
                    href="/new-arrivals"
                    sx={{ display: "block", color: "inherit" }}
                  >
                    {t("New Arrivals")}
                  </Link>
                  <Link
                    href="/offers"
                    sx={{ display: "block", color: "inherit" }}
                  >
                    {t("Offers & Discounts")}
                  </Link>
                  <Link
                    href="/request-car"
                    sx={{ display: "block", color: "inherit" }}
                  >
                    {t("Request a Car")}
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Contact Us")}
                </Typography>
                <Box>
                  <Link
                    href="tel:+123456789"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <PhoneInTalk sx={{ mr: 1 }} />{" "}
                    <Typography>012 03333274</Typography>
                  </Link>
                  {/* <Link
                    href="https://wa.me/1234567890"
                    target="_blank"
                    sx={{ display: "block", color: "inherit" }}
                    >
                    <WhatsApp sx={{ mr: 1 }} /> {t("WhatsApp")}
                    </Link> */}
                  <Link
                    href="https://www.instagram.com/almosallamy.automotive/"
                    target="_blank"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <Instagram sx={{ mr: 1 }} /> {t("Instagram")}
                  </Link>
                  <Link
                    href="https://www.facebook.com/Free4auto"
                    target="_blank"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <Facebook sx={{ mr: 1 }} /> {t("Facebook")}
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@almosallamyautomotive"
                    target="_blank"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <FaTiktok style={{ marginRight: 8, marginLeft: 5 }} />{" "}
                    {t("TikTok")}
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Location")}
                </Typography>
                <Box>
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=30.078438570283%2C31.339852683185&fbclid=IwY2xjawI3yiNleHRuA2FlbQIxMAABHemcfOepXC6mi32aNDAN4hhJxcljhQvRf6WGOGxlwG5S5sQbgqsy5vhO4w_aem_m45TbUKfvhJ4t7ajg40wLA"
                    target="_blank"
                    sx={{ color: "inherit" }}
                  >
                    {t("Find Our Location")}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section - Copyright */}
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                {t(`© ${currentYear} Lama Tech. All Rights Reserved.`)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#000", color: "#fff", py: 2, mt: 4 }}>
        <Container>
          <Typography
            variant="body2"
            color="white"
            sx={{ textAlign: "center" }}
          >
            {`© Created by Lama Tech | ${currentYear} - All Rights Reserved`}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
