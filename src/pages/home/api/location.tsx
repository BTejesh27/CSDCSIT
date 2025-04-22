// src/components/Location.tsx
import { Box, Typography, Button } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { ContactInfoType } from '../../home/api/types';

interface LocationProps {
  contactInfo: ContactInfoType;
}

const Location = ({ contactInfo }: LocationProps) => {
  // Generate the Google Maps URL with coordinates
  const mapsUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&center=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}&zoom=15&maptype=roadmap`;

  return (
    <Box sx={{ mt: 2, position: 'relative' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Find Us
      </Typography>
      
      {/* Interactive Map Container */}
      <Box sx={{ 
        position: 'relative', 
        height: '400px', 
        borderRadius: 2, 
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        mb: 2
      }}>
        {/* Fully interactive Google Maps iframe */}
        <Box
          component="iframe"
          src={mapsUrl}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Interactive Google Map"
        />
        
        {/* Fallback content */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            zIndex: -1,
          }}
        >
          <LocationOn 
            sx={{ 
              fontSize: '3rem', 
              color: '#FF3D57',
              mb: 1,
            }} 
          />
          <Typography variant="body1" sx={{ color: '#333', fontWeight: 'medium' }}>
            SRKR Engineering College
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            {contactInfo.address}
          </Typography>
        </Box>
      </Box>
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LocationOn />}
          href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: '20px', px: 3, py: 1 }}
        >
          Get Directions
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href={`https://www.google.com/maps?q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: '20px', px: 3, py: 1 }}
        >
          Open Full Map
        </Button>
      </Box>
    </Box>
  );
};

export default Location;