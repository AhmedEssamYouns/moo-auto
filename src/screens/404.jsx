import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            textAlign="center"
        >
            <Typography variant="h1" component="h2" gutterBottom>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                Go back to Home
            </Button>
        </Box>
    );
};

export default NotFound;