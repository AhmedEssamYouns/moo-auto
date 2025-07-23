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
  PhoneInTalk,
  Instagram,
  Email,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
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
                    color: "#B30000",
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
                  The ultimate car experience.
                </Typography>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide in direction="up" timeout={1000}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Quick Links
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <Link to="/cars-for-sale" style={{ color: "#ccc", textDecoration: "none" }}>
                    Cars for Sale
                  </Link>
                  <Link to="/new-arrivals" style={{ color: "#ccc", textDecoration: "none" }}>
                    New Arrivals
                  </Link>
                  <Link to="/request-car" style={{ color: "#ccc", textDecoration: "none" }}>
                    Request a Car
                  </Link>
                </Box>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide in direction="right" timeout={1200}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Contact Us
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <a
                    href="tel:01221558000"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <PhoneInTalk sx={{ mr: 1 }} /> 012 21558000
                  </a>
                  <a
                    href="mailto:mooauto9@gmail.com"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <Email sx={{ mr: 1 }} /> mooauto9@gmail.com
                  </a>
                  <a
                    href="https://www.instagram.com/mooautoeg/?hl=ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <Instagram sx={{ mr: 1 }} /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/people/Moo-Auto/61566437047574/?_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center" }}
                  >
                    <Facebook sx={{ mr: 1 }} /> Facebook
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
