import { Box, Typography } from '@mui/material';
import { useState, useCallback } from 'react';

const LocationMap = () => {
  const [mapError, setMapError] = useState(false);

  const handleMapError = useCallback(() => {
    setMapError(true);
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Find Us
      </Typography>
      {mapError ? (
        <Box
          sx={{
            width: '100%',
            height: { xs: '500px', sm: '700px', md: '350px' },
            borderRadius: 2,
            border: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
          }}
        >
          <Typography color="text.secondary">
            Map temporarily unavailable. Please visit our location directly.
          </Typography>
        </Box>
      ) : (
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2sin!4v1450773916697!6m8!1m7!1sVRZD66Mn6_kAAAQvOZt-dg!2m2!1d16.54317458557342!2d81.4963815169823!3f7.378257193743614!4f6.129360768543123!5f0.7820865974627469"
          sx={{
            width: '100%',
            height: { xs: '500px', sm: '700px', md: '350px' },
            borderRadius: 2,
            border: 1,
          }}
          allowFullScreen
          loading="lazy"
          onError={handleMapError}
        />
      )}
    </Box>
  );
};

export default LocationMap;