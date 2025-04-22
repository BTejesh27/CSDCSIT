// src/pages/Home.tsx
import { Box, Container, Grid, Card, Divider, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Welcome from './api/welcome';
import News from './api/News';
import Events from './api/Events';
import Links from './api/Links';
import Contacts from './api/Contact';
import Location from './api/location';
import { NewsItemType, EventItemType, QuickLinkType, ContactInfoType } from './api/types';

// Import images
import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';
import bhargaviImage from '../../assests/images/bhargavi.jpg';

const images = [prajwalan, codingchallenge, SIHWin];

// Updated Contact Info
const updatedContactInfo: ContactInfoType = {
  address: "SRKR Engineering College Chinnamiram, Bhimavaram, Andhra Pradesh 534204, India",
  email: "vishnutej2004@gmail.com",
  phone: "9989948717",
  whatsapp: "9989948717",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=SRKR%20Engineering%20College%20Chinnamiram%2C%20Bhimavaram%2C%20Chinamiram%20Rural%2C%20Andhra%20Pradesh%20534204%2C%20India",
  coordinates: {
    lat: 16.5432,
    lng: 81.4964
  }
};

// News data with imported images
const newsItems: NewsItemType[] = [
  {
    id: "#1",
    date: "23-February-2025",
    title: "Financial Progress with Projections at National Level Technical Symposium IINA-25",
    description: "The National Level Technical Symposium IINA-25 concluded successfully on Saturday with outstanding financial projections and remarkable participation from colleges across the nation.[...]",
    image: bhargaviImage,
    fullContent: "The National Level Technical Symposium IINA-25 concluded successfully on Saturday with outstanding financial projections and remarkable participation from colleges across the nation.[...]"
  },
  {
    date: "27-January-2025",
    title: "Visakha Raghu Engineering College Wins Overall Championship at National Level Go-Kart Championship",
    description: "SRKR Engineering College hosted the prestigious National Level Go-Kart Championship...",
    image: "https://via.placeholder.com/800x400?text=Go-Kart+Championship",
    fullContent: "SRKR Engineering College hosted the prestigious National Level Go-Kart Championship, drawing participation from engineering colleges across India. In an exciting finale, Visakha Ragh[...]"
  },
  {
    date: "26-January-2025",
    title: "Hackathon \"Dev Challenge\" at SRKR Engineering College on January 31st and February 1st",
    description: "SRKR Engineering College is set to host an exciting Hackathon, \"Dev Challenge,\" ...",
    image: "https://via.placeholder.com/800x400?text=Dev+Challenge+Hackathon",
    fullContent: "SRKR Engineering College is set to host an exciting Hackathon, \"Dev Challenge,\" on January 31st and February 1st. This 36-hour coding marathon will bring together the brightest min[...]"
  },
  {
    date: "25-January-2025",
    title: "National Girl Child Day Celebration at SRKR Engineering College",
    description: "In celebration of National Girl Child Day, the Women Empowerment Cell of SRKR En...",
    image: "https://via.placeholder.com/800x400?text=National+Girl+Child+Day",
    fullContent: "In celebration of National Girl Child Day, the Women Empowerment Cell of SRKR Engineering College organized a special event highlighting the importance of education for girls, partic[...]"
  }
];

// Events data with imported images
const eventItems: EventItemType[] = [
  {
    month: "JANUARY",
    day: "23",
    title: "SRKR Go-Kart Championship 2025",
    description: "SRKR Engineering College proudly announces the SRKR Go-Kart Championship 2025, a thrilling platform .....",
    image: bhargaviImage,
    fullContent: "SRKR Engineering College proudly announces the SRKR Go-Kart Championship 2025, a thrilling platform for engineering students to showcase their design and racing skills. Teams from ac[...]"
  },
  {
    month: "JUNE",
    day: "20",
    title: "Workshop on Effective Implementation of Outcome-Based Education",
    description: "Get ready for an exciting learning opportunity at Sagi Rama Krishnam Raju Engineering College .....",
    image: "https://via.placeholder.com/800x400?text=OBE+Workshop",
    fullContent: "Get ready for an exciting learning opportunity at Sagi Rama Krishnam Raju Engineering College (Autonomous) with our upcoming Workshop on Effective Implementation of Outcome-Based Edu[...]"
  },
  {
    month: "APRIL",
    day: "03",
    title: "Freedom Fest 2K24",
    description: "Get ready for an exhilarating experience as SRKR Swecha Learning Centre proudly presents the much-aw.....",
    image: "https://via.placeholder.com/800x400?text=Freedom+Fest+2K24",
    fullContent: "Get ready for an exhilarating experience as SRKR Swecha Learning Centre proudly presents the much-awaited Freedom Fest 2K24! This annual celebration of open-source technology and dig[...]"
  },
  {
    month: "APRIL",
    day: "01",
    title: "National MERN Stack Bootcamp & Hackathon",
    description: "The Department of Information Technology at SKRREC is proud to announce a groundbreaking initiative .....",
    image: "https://via.placeholder.com/800x400?text=MERN+Stack+Bootcamp",
    fullContent: "The Department of Information Technology at SKRREC is proud to announce a groundbreaking initiative - the National MERN Stack Bootcamp & Hackathon scheduled for April 1st-5th, 2025. [...]"
  }
];

const quickLinks: QuickLinkType[] = [
  { name: "Attendance", url: "http://43.250.40.63/Login.aspx?ReturnUrl=%2fStudentLogin%2f", internal: false },
  { name: "CSD Net", url: "http://www.mcr.org.in/csdnet/add_leave.php", internal: false },
  { name: "SRKR web portal", url: "https://srkrexams.in/", internal: false },
  { name: "Academic Calendar", url: "/academic", internal: true },
  { name: "Faculty Resources", url: "/faculty", internal: true },
  { name: "Research Publications", url: "https://example.com/research-publications", internal: false },
];

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Welcome images={images} />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* News and Events */}
        <Grid container spacing={4} alignItems="stretch">
          {/* News Section */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                height: '100%',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <News newsItems={newsItems} />
            </Card>
          </Grid>

          {/* Events Section */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                height: '100%',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <Events eventItems={eventItems} />
            </Card>
          </Grid>
        </Grid>

        {/* Quick Links and Contact Info */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                height: '100%',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <Links quickLinks={quickLinks} />
            </Card>
          </Grid>

          {/* Contact Info and Map */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.25rem' } 
                  }}
                >
                  Contact Information
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Contacts contactInfo={updatedContactInfo} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px solid rgba(41, 128, 185, 0.1)',
                    }}
                  >
                    <Location contactInfo={updatedContactInfo} />
                  </Paper>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box textAlign="center" mt={8} color="text.secondary">
          <Divider sx={{ my: 3 }} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="body2"
              sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              &copy; {new Date().getFullYear()} CSD & CSIT Department. All rights reserved.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;