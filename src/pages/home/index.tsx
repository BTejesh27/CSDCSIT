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
  Email,
  Phone,
  LocationOn,
  Visibility,
  Flag,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';
import { contactInfo } from './home';
const images = [prajwalan, codingchallenge, SIHWin];

// Department Overview with Vision and Mission
const departmentOverview = {
  title: "Department of Computer Science & Information Technology",
  description: "The Department of Computer Science & Information Technology at SRKR Engineering College is committed to providing high-quality education and research opportunities in the field of computer science and information technology. Our department is equipped with state-of-the-art facilities and experienced faculty members who are dedicated to nurturing the next generation of technology leaders.",
  vision: {
    title: "Vision",
    content: "To be a center of excellence in Computer Science and Information Technology education and research, producing highly skilled professionals who contribute significantly to technological advancement and innovation in the global IT industry."
  },
  mission: {
    title: "Mission",
    content: "Our mission is to provide comprehensive education that combines theoretical knowledge with practical skills, foster a culture of innovation and research, collaborate with industry partners to offer relevant experience, and prepare students to address real-world challenges through technological solutions while upholding ethical standards."
  }
};

// News data from the image
const newsItems = [
  {
    id: "#1",
    date: "23-February-2025",
    title: "Financial Progress with Projections at National Level Technical Symposium IINA-25",
    description: "The National Level Technical Symposium IINA-25 concluded successfully on Saturda..."
  },
  {
    date: "27-January-2025",
    title: "Visakha Raghu Engineering College Wins Overall Championship at National Level Go-Kart Championship",
    description: "SRKR Engineering College hosted the prestigious National Level Go-Kart Champions..."
  },
  {
    date: "26-January-2025",
    title: "Hackathon \"Dev Challenge\" at SRKR Engineering College on January 31st and February 1st",
    description: "SRKR Engineering College is set to host an exciting Hackathon, \"Dev Challenge,\" ..."
  },
  {
    date: "25-January-2025",
    title: "National Girl Child Day Celebration at SRKR Engineering College",
    description: "In celebration of National Girl Child Day, the Women Empowerment Cell of SRKR En..."
  }
];

// Events data from the image
const eventItems = [
  {
    month: "JANUARY",
    day: "23",
    title: "SRKR Go-Kart Championship 2025",
    description: "SRKR Engineering College proudly announces the SRKR Go-Kart Championship 2025, a thrilling platform ....."
  },
  {
    month: "JUNE",
    day: "20",
    title: "Workshop on Effective Implementation of Outcome-Based Education",
    description: "Get ready for an exciting learning opportunity at Sagi Rama Krishnam Raju Engineering College (Auton ....."
  },
  {
    month: "APRIL",
    day: "03",
    title: "Freedom Fest 2K24",
    description: "Get ready for an exhilarating experience as SRKR Swecha Learning Centre proudly presents the much-aw ....."
  },
  {
    month: "APRIL",
    day: "01",
    title: "National MERN Stack Bootcamp & Hackathon",
    description: "The Department of Information Technology at SKRREC is proud to announce a groundbreaking initiative ....."
  }
];

// Updated Quick links with new items and URLs
const quickLinks = [
  { name: "Academic Calendar", url: "https://example.com/academic-calendar" },
  { name: "Student Portal", url: "https://example.com/student-portal" },
  { name: "Faculty Resources", url: "https://example.com/faculty-resources" },
  { name: "Research Publications", url: "https://example.com/research-publications" },
  { name: "Campus Map", url: "https://example.com/campus-map" },
  { name: "Attendance", url: "http://43.250.40.63/Login.aspx?ReturnUrl=%2fStudentLogin%2f" },
  { name: "CSD Net", url: "https://example.com/csdt-net" }
];

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

// News Item Component
interface NewsItemProps {
  item: {
    id?: string;
    date: string;
    title: string;
    description: string;
  };
}

const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <Box mb={3}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="caption" color="text.secondary">
              Added on: {item.date}
            </Typography>
            {item.id && (
              <Typography variant="body2" color="error" fontWeight="bold">
                {item.id}
              </Typography>
            )}
          </Box>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

// Event Item Component
interface EventItemProps {
  event: {
    month: string;
    day: string;
    title: string;
    description: string;
  };
}

const EventItem = ({ event }: EventItemProps) => {
  return (
    <Box mb={4} display="flex">
      <Box
        sx={{
          backgroundColor: '#2980b9',
          color: 'white',
          p: 1,
          borderRadius: 1,
          minWidth: '80px',
          textAlign: 'center',
          mr: 2,
        }}
      >
        <Typography variant="caption" sx={{ display: 'block' }}>
          {event.month}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {event.day}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
      </Box>
    </Box>
  );
};

const Home = () => {
  return (
    <Box sx={{ background: '#f8fbff', minHeight: '100vh', pb: 6 }}>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Department Overview with Vision and Mission */}
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
            <Typography variant="body1" color="text.secondary" paragraph>
              {departmentOverview.description}
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {/* Vision Section */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Visibility color="primary" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {departmentOverview.vision.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ pl: 4 }}>
                  {departmentOverview.vision.content}
                </Typography>
              </Grid>
              
              {/* Mission Section */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Flag color="primary" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {departmentOverview.mission.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ pl: 4 }}>
                  {departmentOverview.mission.content}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </motion.div>

        {/* News and Events */}
        <Grid container spacing={4} alignItems="stretch">
          {/* News Section */}
          <Grid item xs={12} md={6}>
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
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  News
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {newsItems.map((item, index) => (
                  <NewsItem key={index} item={item} />
                ))}
              </Card>
            </motion.div>
          </Grid>

          {/* Events Section */}
          <Grid item xs={12} md={6}>
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
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Events
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {eventItems.map((event, index) => (
                  <EventItem key={index} event={event} />
                ))}
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Quick Links and Contact Info */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
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
                  {quickLinks.map((link, index) => (
                    <ListItem 
                      key={index} 
                      disablePadding 
                      sx={{ mb: 1 }}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
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

          {/* Contact Info */}
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
          </Grid>
        </Grid>

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