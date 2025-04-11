import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Announcement,
  Link as LinkIcon,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';



import prajwalan from '../../assests/images/s.jpeg';

import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';
import { departmentOverview, announcements, quickLinks, contactInfo } from './home';
const images = [prajwalan, codingchallenge, SIHWin];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '60vh', md: '75vh' },
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
        <Typography variant="h3" fontWeight="bold">
          Welcome to CSD & CSIT
        </Typography>
        <Typography variant="h6" mt={1}>
          Celebrating Innovation and National Recognition
        </Typography>
      </motion.div>
    </Box>
  );
};

const Home = () => {
  return (
    <Box sx={{ background: '#f8fbff', minHeight: '100vh', pb: 6 }}>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Department Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: '#e3f2fd',
              mb: 5,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              {departmentOverview.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {departmentOverview.description}
            </Typography>
          </Card>
        </motion.div>

        {/* Announcements and Quick Links */}
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  height: '100%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <Announcement sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Announcements & News
                </Typography>
                <List>
                  {announcements.map((text, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <Announcement color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  height: '100%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <LinkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Quick Links
                </Typography>
                <List>
                  {quickLinks.map((text, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <LinkIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card
            elevation={4}
            sx={{
              mt: 5,
              p: 4,
              borderRadius: 4,
              backgroundColor: '#e3f2fd',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn sx={{ mr: 1 }} color="primary" />
              <Typography>{contactInfo.address}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Email sx={{ mr: 1 }} color="primary" />
              <Typography>{contactInfo.email}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Phone sx={{ mr: 1 }} color="primary" />
              <Typography>{contactInfo.phone}</Typography>
            </Box>
          </Card>
        </motion.div>

        {/* Footer */}
        <Box textAlign="center" mt={8} color="text.secondary">
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} CSD & CSIT Department. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;