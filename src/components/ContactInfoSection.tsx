import { Box, Typography, Link } from '@mui/material';
import { Email, Phone, LocationOn, WhatsApp } from '@mui/icons-material';

const updatedContactInfo = {
  address: "SRKR Engineering College Chinnamiram, Bhimavaram, Andhra Pradesh 534204, India",
  email: "suresh.mudunuri@srkrec.edu.in",
  phone: "+919866600002",
  whatsapp: "+919866600002",
};

const ContactInfoSection = () => (
  <Box>
    <Box display="flex" alignItems="flex-start" mb={2}>
      <LocationOn sx={{ mr: 1, mt: 0.5 }} color="primary" />
      <Typography>{updatedContactInfo.address}</Typography>
    </Box>
    <Box display="flex" alignItems="center" mb={2}>
      <Email sx={{ mr: 1 }} color="primary" />
      <Link
        href={`mailto:${updatedContactInfo.email}`}
        underline="hover"
        color="inherit"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <Typography>{updatedContactInfo.email}</Typography>
      </Link>
    </Box>
    <Box display="flex" alignItems="center" mb={2}>
      <Phone sx={{ mr: 1 }} color="primary" />
      <Link
        href={`tel:${updatedContactInfo.phone}`}
        underline="hover"
        color="inherit"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <Typography>Mobile: {updatedContactInfo.phone}</Typography>
      </Link>
    </Box>
    <Box display="flex" alignItems="center">
      <WhatsApp sx={{ mr: 1 }} color="primary" />
      <Link
        href={`https://wa.me/${updatedContactInfo.whatsapp.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        color="inherit"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <Typography>WhatsApp: {updatedContactInfo.whatsapp}</Typography>
      </Link>
    </Box>
  </Box>
);

export default ContactInfoSection;