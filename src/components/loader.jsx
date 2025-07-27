import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Lottie from 'lottie-react';
import carAnimation from '../assets/jsons/Speedy.json';

const LottieComponent = ({ darkMode }) => {
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={darkMode ? '#121212' : 'white'}
      height="100%"
      width={isMobile ? '100%' : '40%'}
    >
      <Lottie
        animationData={carAnimation}
        loop
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default LottieComponent;
