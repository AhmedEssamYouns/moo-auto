import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/jsons/car2.json';
import { useMediaQuery } from '@mui/material';

const LottieComponent = () => {
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const defaultOptions = {
        loop: true, // Set to true for infinite loop
        autoplay: true, // Automatically play the animation
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet', // Change to 'meet' to make sure all content fits within the container
            progressiveLoad: true
        },
    };

    return (
        <Lottie 
            options={defaultOptions} 
            height="100%" // Adjust height and width dynamically if necessary
            width={isMobile ? "100%" : "40%" }
        />
    );
};

export default LottieComponent;
