import React from "react";
import { Link } from "react-router-dom";
import LOGOpng from "../assets/imgs/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      background: "#f8f8f8",
      color: "#222",
      padding: "60px 20px 30px",
      borderTop: "1px solid #ddd",
      fontFamily: "'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "40px",
    },
    column: {
      flex: "1 1 300px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    logoImg: {
      height: "70px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    link: {
      color: "#555",
      textDecoration: "none",
      fontSize: "15px",
    },
    bottomText: {
      textAlign: "center",
      marginTop: "40px",
      fontSize: "14px",
      color: "#999",
    },
    iconLink: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#555",
      textDecoration: "none",
      fontSize: "15px",
    },
    "@media (maxWidth: 768px)": {
      container: {
        flexDirection: "column",
        alignItems: "center",
      },
      column: {
        alignItems: "center",
        textAlign: "center",
      },
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <Link to="/">
            <img src={LOGOpng} alt="Logo" style={styles.logoImg} />
          </Link>
          <p style={{ color: "#666", fontSize: "14px" }}>
            The ultimate car experience.
          </p>
        </div>

        <div style={styles.column}>
          <div style={styles.sectionTitle}>Quick Links</div>
          <Link to="/cars-for-sale" style={styles.link}>
            Cars for Sale
          </Link>
          <Link to="/new-arrivals" style={styles.link}>
            New Arrivals
          </Link>
          <Link to="/request-car" style={styles.link}>
            Request a Car
          </Link>
        </div>

        <div style={styles.column}>
          <div style={styles.sectionTitle}>Contact Us</div>
          <a href="tel:01221558000" style={styles.iconLink}>
            <PhoneIcon fontSize="small" /> 012 21558000
          </a>
          <a href="mailto:mooauto9@gmail.com" style={styles.iconLink}>
            <EmailIcon fontSize="small" /> mooauto9@gmail.com
          </a>
          <a
            href="https://www.instagram.com/mooautoeg/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
          >
            <InstagramIcon fontSize="small" /> Instagram
          </a>
          <a
            href="https://www.facebook.com/people/Moo-Auto/61566437047574/?_rdr"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
          >
            <FacebookIcon fontSize="small" /> Facebook
          </a>
        </div>
      </div>

      <div style={styles.bottomText}>
        © {currentYear} Moo Auto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
