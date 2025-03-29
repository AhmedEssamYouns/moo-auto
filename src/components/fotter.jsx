import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import {
  Facebook,
  WhatsApp,
  PhoneInTalk,
  Instagram,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa"; // Use react-icons for TikTok
import logo from "../assets/imgs/logo.png";
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
          {/* Left Section - Logo */}
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

          {/* Middle Section - Links */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Quick Links")}
                </Typography>
                <Box>
                  <Box
                    component={Link}
                    to="/cars-for-sale"
                    style={{ display: "block", color: "inherit" }}
                  >
                    {t("Cars for Sale")}
                  </Box>
                  <Link to="/new-arrivals" style={{ display: "block", color: "inherit" }}>
                    {t("New Arrivals")}
                  </Link>
                  {/* <Link to="/offers" style={{ display: "block", color: "inherit" }}>
                    {t("Offers & Discounts")}
                  </Link>  */}
                  <Box
                    component={Link}
                    to="/request-car"
                    style={{ display: "block", color: "inherit" }}
                  >
                    {t("Request a Car")}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Contact Us")}
                </Typography>
                <Box>
                  <a
                    href="tel:+201203333274"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <PhoneInTalk style={{ marginRight: 8 }} />
                    <Typography>+20 120 333 3274</Typography>
                  </a>
                  <a
                    href="https://www.instagram.com/almosallamy.automotive/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Instagram style={{ marginRight: 8 }} /> {t("Instagram")}
                  </a>
                  <a
                    href="https://www.facebook.com/Free4auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Facebook style={{ marginRight: 8 }} /> {t("Facebook")}
                  </a>
                  <a
                    href="https://www.tiktok.com/@almosallamyautomotive"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <FaTiktok style={{ marginRight: 8 }} /> {t("TikTok")}
                  </a>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("Location")}
                </Typography>
                <Box>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=30.078438570283%2C31.339852683185"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {t("Find Our Location")}
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section - Copyright */}
          {/* <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                {t(`© ${currentYear} Lama Tech. All Rights Reserved.`)}
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Container>

      {/* Bottom Footer Bar */}
      {/* <Box sx={{ backgroundColor: "#000", color: "#fff", py: 2, mt: 4 }}>
        <Container>
          <Typography
            variant="body2"
            color="white"
            sx={{ textAlign: "center" }}
          >
            {`© Created by Lama Tech | ${currentYear} - All Rights Reserved`}
          </Typography>
        </Container>
      </Box> */}
    </Box>
  );
};

export default Footer;
