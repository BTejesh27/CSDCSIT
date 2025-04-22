// src/components/Contacts.tsx
import { Box, Typography, Link, Paper } from '@mui/material';
import { Email, Phone, WhatsApp, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ContactInfoType } from './types';

interface ContactsProps {
  contactInfo: ContactInfoType;
}

const Contacts = ({ contactInfo }: ContactsProps) => {
  const formatPhoneForHref = (phone: string) => {
    return `tel:+91${phone}`;
  };

  const formatWhatsAppLink = (phone: string) => {
    return `https://wa.me/91${phone}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: 'rgba(41, 128, 185, 0.04)',
          border: '1px solid rgba(41, 128, 185, 0.1)',
          height: '100%',
        }}
      >
        <Box 
          display="flex" 
          alignItems="flex-start" 
          mb={2}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(5px)'
            }
          }}
        >
          <LocationOn 
            sx={{ mr: 1, mt: 0.5 }} 
            color="primary" 
          />
          <Typography>{contactInfo.address}</Typography>
        </Box>
        
        <Box 
          display="flex" 
          alignItems="center" 
          mb={2}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(5px)'
            }
          }}
        >
          <Email 
            sx={{ mr: 1 }} 
            color="primary" 
          />
          <Link
            href={`mailto:${contactInfo.email}`}
            underline="hover"
            color="inherit"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': { color: 'primary.main' } 
            }}
          >
            <Typography>{contactInfo.email}</Typography>
          </Link>
        </Box>
        
        <Box 
          display="flex" 
          alignItems="center" 
          mb={2}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(5px)'
            }
          }}
        >
          <Phone 
            sx={{ mr: 1 }} 
            color="primary" 
          />
          <Link
            href={formatPhoneForHref(contactInfo.phone)}
            underline="hover"
            color="inherit"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': { color: 'primary.main' } 
            }}
          >
            <Typography>Mobile: {contactInfo.phone}</Typography>
          </Link>
        </Box>
        
        <Box 
          display="flex" 
          alignItems="center"
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(5px)'
            }
          }}
        >
          <WhatsApp 
            sx={{ mr: 1 }} 
            color="primary" 
          />
          <Link
            href={formatWhatsAppLink(contactInfo.whatsapp)}
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
            <Typography>WhatsApp: {contactInfo.whatsapp}</Typography>
          </Link>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Contacts;