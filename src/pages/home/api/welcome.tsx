// src/components/Welcome.tsx
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WelcomeProps {
  images: string[];
}

const Welcome = ({ images }: WelcomeProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '60vh', sm: '65vh', md: '75vh' },
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        objectFit: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.35)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1 }}
      >
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          fontWeight="bold"
          sx={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            px: 2
          }}
        >
          Welcome to CSD & CSIT
        </Typography>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          mt={1}
          sx={{ 
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            px: 2
          }}
        >
          Celebrating Innovation and National Recognition
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Welcome;