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
  Link as LinkIcon,

} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LocationMap from '../../components/LocationMap';
import NewsItem from '../../components/NewsItem';
import EventItem from '../../components/EventItem';
import ContactInfoSection from '../../components/ContactInfoSection';

import newsItems from './api/news';
import eventItems from './api/events';
import quickLinks from './api/quickLinks';

import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';

const heroImages = [prajwalan, codingchallenge, SIHWin];
const HERO_SLIDE_INTERVAL = 4000;

const HeroSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  const backgroundImageUrl = useMemo(() => {
    try {
      return `url(${heroImages[currentImageIndex]})`;
    } catch (error) {
      setImageLoadError(true);
      return 'url(https://via.placeholder.com/1920x1080?text=Loading...)';
    }
  }, [currentImageIndex]);

  useEffect(() => {
    if (imageLoadError || heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, HERO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [imageLoadError]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '60vh', md: '75vh' },
        backgroundImage: backgroundImageUrl,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
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
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSlider />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>News</Typography>
                <Divider sx={{ mb: 3 }} />
                {newsItems.map((item, index) => (
                  <NewsItem key={`news-${index}`} item={item} />
                ))}
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Events</Typography>
                <Divider sx={{ mb: 3 }} />
                {eventItems.map((event, index) => (
                  <EventItem key={`event-${index}`} event={event} />
                ))}
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <LinkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Quick Links
                </Typography>
                <List>
                  {quickLinks.map((link, index) => (
                    <ListItem
                      key={`link-${index}`}
                      disablePadding
                      sx={{ mb: 1 }}
                      component={link.internal ? RouterLink : "a"}
                      to={link.internal ? link.url : undefined}
                      href={!link.internal ? link.url : undefined}
                      target={!link.internal ? "_blank" : undefined}
                      rel={!link.internal ? "noopener noreferrer" : undefined}
                    >
                      <ListItemIcon>
                        <LinkIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={link.name} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Contact Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}><ContactInfoSection /></Grid>
                  <Grid item xs={12} md={6}><LocationMap /></Grid>
                </Grid>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={8} color="text.secondary">
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2">&copy; {currentYear} CSD & CSIT Department. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;