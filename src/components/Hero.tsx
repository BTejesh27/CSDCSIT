import { Box, Typography } from '@mui/material';

const Hero = () => (
  <Box sx={{ py: 8, textAlign: 'center', background: '#f5f5f5' }}>
    <Typography variant="h3" fontWeight="bold" gutterBottom>
      Welcome to CSD & CSIT Department
    </Typography>
    <Typography variant="h6" color="text.secondary">
      Empowering students for a digital future
    </Typography>
  </Box>
);

export default Hero;