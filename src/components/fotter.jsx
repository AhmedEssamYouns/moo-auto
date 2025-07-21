import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  Fade,
  Slide,
} from "@mui/material";
import {
  Facebook,
  WhatsApp,
  PhoneInTalk,
  Instagram,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = ({ darkMode }) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #000 0%, #111 100%)",
        color: "#fff",
        pt: 8,
        px: { xs: 2, md: 10 },
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Slide in direction="left" timeout={800}>
              <Box>
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    color: "#ff3333",
                    textDecoration: "none",
                    fontFamily: "Michroma",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    mb: 2,
                    display: "inline-block",
                  }}
                >
                  Moo Auto
                </Typography>
                <Typography sx={{ mt: 1, lineHeight: 1.8, opacity: 0.7 }}>
                  {t("Your ultimate destination for luxury and performance cars.")}
                </Typography>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide in direction="up" timeout={1000}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {t("Quick Links")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <Link to="/cars-for-sale" style={{ color: "#ccc", textDecoration: "none" }}>
                    {t("Cars for Sale")}
                  </Link>
                  <Link to="/new-arrivals" style={{ color: "#ccc", textDecoration: "none" }}>
                    {t("New Arrivals")}
                  </Link>
                  <Link to="/request-car" style={{ color: "#ccc", textDecoration: "none" }}>
                    {t("Request a Car")}
                  </Link>
                </Box>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide in direction="right" timeout={1200}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {t("Contact Us")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <a
                    href="tel:+201203333274"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <PhoneInTalk sx={{ mr: 1 }} /> +20 120 333 3274
                  </a>
                  <a
                    href="https://www.instagram.com/almosallamy.automotive/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <Instagram sx={{ mr: 1 }} /> {t("Instagram")}
                  </a>
                  <a
                    href="https://www.facebook.com/Free4auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <Facebook sx={{ mr: 1 }} /> {t("Facebook")}
                  </a>
                  <a
                    href="https://www.tiktok.com/@almosallamyautomotive"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <FaTiktok style={{ marginRight: 8 }} /> {t("TikTok")}
                  </a>
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>

        <Fade in timeout={1600}>
          <Box sx={{ textAlign: "center", mt: 6, fontSize: "0.875rem", opacity: 0.5 }}>
            © {currentYear} Moo Auto. All rights reserved.
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Footer;
