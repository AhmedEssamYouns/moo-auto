import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";

const AboutUsScreen = () => {
  const { t } = useLanguage();
  const theme = useTheme();

  const dummyText = `
  *Welcome to Our Company*  
  We specialize in providing the best automotive solutions, ensuring quality and reliability for every customer.  
  
  *Founded in 1998*  
  With over two decades of experience, we have built a reputation for excellence in the automotive industry.  
  
  *Our Mission*  
  To deliver top-quality vehicles with unmatched customer service. We believe in innovation, efficiency, and customer satisfaction as our guiding principles.  
  
  *Why Choose Us?*  
  - **Experience:** With years of industry expertise, we understand what our customers need.  
  - **Quality Assurance:** Every vehicle undergoes rigorous testing to meet our high standards.  
  - **Customer Support:** Our dedicated team is here to assist you at every step of your journey.  
  
  *Our Services*  
  - New and Used Car Sales  
  - Leasing and Financing Options  
  - Vehicle Maintenance and Repairs  
  - Customization and Upgrades  
  
  *Our Commitment to Sustainability*  
  We are committed to eco-friendly solutions, promoting sustainable energy and fuel-efficient vehicles.  
  
  *Contact Us*  
  📍 1234 Main Street, Your City, Your Country  
  📞 +123 456 7890  
  📧 contact@ourcompany.com  
  
  We look forward to serving you!  
  `;
  const parseText = (text) => {
    return text
      .trim()
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null; // Ignore empty lines
  
        // Check for titles (*Title*)
        if (trimmedLine.startsWith("*") && trimmedLine.endsWith("*")) {
          return (
            <Typography key={index} variant="h5" fontWeight="bold" mt={2} gutterBottom>
              {trimmedLine.replace(/\*/g, "")}
            </Typography>
          );
        }
  
        // Replace **bold text** with <strong> inside the body text
        const boldText = trimmedLine.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
        return (
            <Typography variant="body1" component="p">
            <span dangerouslySetInnerHTML={{ __html: boldText }} />
          </Typography>
        );
      });
  };
  

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          p: 3,
          mt: 5,
          minHeight: "60vh",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {parseText(dummyText)}
      </Box>
    </Container>
  );
};

export default AboutUsScreen;
