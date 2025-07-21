import React from 'react';
import { CircularProgress, Box, useMediaQuery, useTheme } from '@mui/material';

const LottieComponent = () => {
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width={isMobile ? '100%' : '40%'}
    >
      <CircularProgress size={60} thickness={5} sx={{ color: '#B30000' }} />
    </Box>
  );
};

export default LottieComponent;
