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
  Modal,
  IconButton,
  Button,
  Link,
} from '@mui/material';
import {
  Link as LinkIcon,
  Email,
  Phone,
  LocationOn,
  Visibility,
  Flag,
  Close,
  WhatsApp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import images
import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';
import bhargaviImage from '../../assests/images/bhargavi.jpg';

const images = [prajwalan, codingchallenge, SIHWin];

// Updated Contact Info
const updatedContactInfo = {
  address: "SRKR Engineering College Chinnamiram, Bhimavaram, Andhra Pradesh 534204, India",
  email: "vishnutej2004@gmail.com",
  phone: "9989948717",
  whatsapp: "9989948717",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=SRKR%20Engineering%20College%20Chinnamiram%2C%20Bhimavaram%2C%20Chinamiram%20Rural%2C%20Andhra%20Pradesh%20534204%2C%20India",
};

// News data with imported images
const newsItems = [
  {
    id: "#1",
    date: "23-February-2025",
    title: "Financial Progress with Projections at National Level Technical Symposium IINA-25",
    description: "The National Level Technical Symposium IINA-25 concluded successfully on Saturday with outstanding financial projections and remarkable participation from colleges across the nation.",
    image: bhargaviImage,
    fullContent: "The National Level Technical Symposium IINA-25 concluded successfully on Saturday with outstanding financial projections and remarkable participation from colleges across the nation. The event featured technical presentations, coding competitions, and innovative project demonstrations. Over 500 students from 30 different colleges participated in various events, making it one of the largest technical symposiums in the region. The Department of Computer Science & Information Technology played a key role in organizing the event, ensuring smooth execution of all technical activities. Distinguished guests from industry and academia praised the quality of projects presented and the organizational capabilities of the SRKR Engineering College team. The event also served as a platform for industry-academia interaction, with several companies expressing interest in the innovative projects displayed by the students.",
  },
  {
    date: "27-January-2025",
    title: "Visakha Raghu Engineering College Wins Overall Championship at National Level Go-Kart Championship",
    description: "SRKR Engineering College hosted the prestigious National Level Go-Kart Championship...",
    image: "https://via.placeholder.com/800x400?text=Go-Kart+Championship",
    fullContent: "SRKR Engineering College hosted the prestigious National Level Go-Kart Championship, drawing participation from engineering colleges across India. In an exciting finale, Visakha Raghu Engineering College emerged as the overall champion, demonstrating exceptional engineering skills and racing strategy. The three-day event showcased the technical prowess of engineering students in designing, building, and racing their custom-made go-karts. The competition was judged on multiple parameters including vehicle design, innovation, performance, and racing time. SRKR Engineering College's team secured the third position, showing remarkable improvement from last year's performance. The event was graced by prominent automobile industry experts who provided valuable feedback to participants and highlighted the importance of practical engineering skills.",
  },
  {
    date: "26-January-2025",
    title: "Hackathon \"Dev Challenge\" at SRKR Engineering College on January 31st and February 1st",
    description: "SRKR Engineering College is set to host an exciting Hackathon, \"Dev Challenge,\" ...",
    image: "https://via.placeholder.com/800x400?text=Dev+Challenge+Hackathon",
    fullContent: "SRKR Engineering College is set to host an exciting Hackathon, \"Dev Challenge,\" on January 31st and February 1st. This 36-hour coding marathon will bring together the brightest minds from various engineering colleges to solve real-world problems using technology. The event is being organized in collaboration with major tech companies who have provided problem statements related to AI, blockchain, IoT, and sustainable development. Prizes worth ₹3 lakhs will be awarded to the winning teams, with opportunities for internships and job placements for outstanding performers. Registration is open until January 28th, and participants can form teams of 3-4 members. The Department of Computer Science & Information Technology has been working diligently to create the perfect environment for this competitive yet collaborative event."
  },
  {
    date: "25-January-2025",
    title: "National Girl Child Day Celebration at SRKR Engineering College",
    description: "In celebration of National Girl Child Day, the Women Empowerment Cell of SRKR En...",
    image: "https://via.placeholder.com/800x400?text=National+Girl+Child+Day",
    fullContent: "In celebration of National Girl Child Day, the Women Empowerment Cell of SRKR Engineering College organized a special event highlighting the importance of education for girls, particularly in STEM fields. The program included inspirational talks by successful women engineers and scientists, interactive workshops on career development, and a panel discussion on overcoming gender barriers in technical education. Female students from nearby schools were invited to participate and explore engineering laboratories, providing them with firsthand experience of technical education. The college also announced a special scholarship program for meritorious girl students pursuing engineering education. Faculty members emphasized the college's commitment to providing equal opportunities and a safe learning environment for all students, regardless of gender."
  }
];

// Events data with imported images
const eventItems = [
  {
    month: "JANUARY",
    day: "23",
    title: "SRKR Go-Kart Championship 2025",
    description: "SRKR Engineering College proudly announces the SRKR Go-Kart Championship 2025, a thrilling platform .....",
    image: bhargaviImage,
    fullContent: "SRKR Engineering College proudly announces the SRKR Go-Kart Championship 2025, a thrilling platform for engineering students to showcase their design and racing skills. Teams from across the country will compete in this three-day event featuring custom-built go-karts designed and manufactured by students. The competition includes various assessment rounds like technical inspection, design evaluation, cost analysis, and finally, the racing event. Registration is open until January 15th, with the event scheduled for January 23-25, 2025. This competition provides an excellent opportunity for students to apply theoretical knowledge to practical engineering challenges while developing teamwork and project management skills."
  },
  {
    month: "JUNE",
    day: "20",
    title: "Workshop on Effective Implementation of Outcome-Based Education",
    description: "Get ready for an exciting learning opportunity at Sagi Rama Krishnam Raju Engineering College .....",
    image: "https://via.placeholder.com/800x400?text=OBE+Workshop",
    fullContent: "Get ready for an exciting learning opportunity at Sagi Rama Krishnam Raju Engineering College (Autonomous) with our upcoming Workshop on Effective Implementation of Outcome-Based Education. This two-day workshop is designed for faculty members and educational administrators who want to enhance their understanding and application of OBE principles in engineering education. Distinguished speakers from IITs and NITs will share their expertise on curriculum design, assessment methods, and continuous improvement processes aligned with OBE frameworks. The workshop will include hands-on sessions for developing course outcomes, program outcomes, and appropriate assessment tools. Registration is limited to 50 participants to ensure interactive and personalized learning experiences."
  },
  {
    month: "APRIL",
    day: "03",
    title: "Freedom Fest 2K24",
    description: "Get ready for an exhilarating experience as SRKR Swecha Learning Centre proudly presents the much-aw.....",
    image: "https://via.placeholder.com/800x400?text=Freedom+Fest+2K24",
    fullContent: "Get ready for an exhilarating experience as SRKR Swecha Learning Centre proudly presents the much-awaited Freedom Fest 2K24! This annual celebration of open-source technology and digital freedom will feature workshops on Linux, open-source development tools, and free software alternatives. The event includes a 24-hour hackathon focused on developing solutions using open-source technologies, enlightening talks by open-source advocates and industry experts, and multiple hands-on sessions for beginners and advanced users alike. Special attractions include an installation festival where participants can get help installing Linux on their devices and an exhibition showcasing student projects developed using open-source tools. Join us on April 3rd-5th for three days of learning, collaboration, and celebration of digital freedom!"
  },
  {
    month: "APRIL",
    day: "01",
    title: "National MERN Stack Bootcamp & Hackathon",
    description: "The Department of Information Technology at SKRREC is proud to announce a groundbreaking initiative .....",
    image: "https://via.placeholder.com/800x400?text=MERN+Stack+Bootcamp",
    fullContent: "The Department of Information Technology at SKRREC is proud to announce a groundbreaking initiative - the National MERN Stack Bootcamp & Hackathon scheduled for April 1st-5th, 2025. This comprehensive five-day program begins with an intensive three-day bootcamp covering MongoDB, Express.js, React.js, and Node.js, followed by a two-day hackathon where participants will build full-stack applications using the MERN stack. Industry experts from leading tech companies will conduct the training sessions and mentor participants during the hackathon. This event is open to students from all engineering colleges across India, with attractive cash prizes for the top three teams in the hackathon. Certificates will be provided to all participants, with special recognition for outstanding performers. Limited spots are available, so early registration is encouraged."
  }
];

const quickLinks = [
  { name: "Attendance", url: "http://43.250.40.63/Login.aspx?ReturnUrl=%2fStudentLogin%2f", internal: false },
  { name: "CSD Net", url: "http://www.mcr.org.in/csdnet/add_leave.php", internal: false },
  { name: "SRKR web portal", url: "https://srkrexams.in/", internal: false },
  { name: "Academic Calendar", url: "/academic", internal: true },
  { name: "Faculty Resources", url: "/faculty", internal: true },
  { name: "Research Publications", url: "https://example.com/research-publications", internal: false },
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

// Location Map Component
const LocationMap = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Find Us
      </Typography>
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
      />
    </Box>
  );
};

// News Item Component with Popup functionality
interface NewsItemProps {
  item: {
    id?: string;
    date: string;
    title: string;
    description: string;
    image: string;
    fullContent: string;
  };
}

const NewsItem = ({ item }: NewsItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box mb={3} sx={{ cursor: 'pointer' }} onClick={handleOpen}>
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

      {/* Modified Modal Popup for News - Image on left, content on right */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 10,
            }}
          >
            <Close />
          </IconButton>
          
          <Typography variant="caption" display="block" color="text.secondary" mb={2}>
            {item.date}
          </Typography>
          
          <Grid container spacing={3}>
            {/* Image on the left */}
            <Grid item xs={12} sm={5}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            </Grid>
            
            {/* Content on the right */}
            <Grid item xs={12} sm={7}>
              <Typography id="news-modal-title" variant="h5" component="h2" fontWeight="bold" color="primary" mb={2}>
                {item.title}
              </Typography>
              <Typography id="news-modal-description" variant="body1">
                {item.fullContent}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

// Event Item Component with Popup functionality
interface EventItemProps {
  event: {
    month: string;
    day: string;
    title: string;
    description: string;
    image: string;
    fullContent: string;
  };
}

const EventItem = ({ event }: EventItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box mb={4} display="flex" sx={{ cursor: 'pointer' }} onClick={handleOpen}>
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

      {/* Modified Modal Popup for Events - Image on left, content on right */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 10,
            }}
          >
            <Close />
          </IconButton>
          
          <Typography variant="body2" display="block" color="text.secondary" mb={1}>
            Date: <strong>{event.day} {event.month}</strong>
          </Typography>
          
          <Grid container spacing={3}>
            {/* Image on the left */}
            <Grid item xs={12} sm={5}>
              <Box
                component="img"
                src={event.image}
                alt={event.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            </Grid>
            
            {/* Content on the right */}
            <Grid item xs={12} sm={7}>
              <Typography id="event-modal-title" variant="h5" component="h2" fontWeight="bold" color="primary" mb={2}>
                {event.title}
              </Typography>
              <Typography id="event-modal-description" variant="body1">
                {event.fullContent}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

// Dynamic Contact Info Component with clickable links
const ContactInfoSection = () => {
  // Format phone number for href
  const formatPhoneForHref = (phone: string) => {
    return `tel:+91${phone}`; // Adding India country code +91
  };

  // Format WhatsApp link
  const formatWhatsAppLink = (phone: string) => {
    return `https://wa.me/91${phone}`; // WhatsApp deep link with India country code
  };

  return (
    <Box>
      <Box display="flex" alignItems="flex-start" mb={2}>
        <LocationOn sx={{ mr: 1, mt: 0.5 }} color="primary" />
        <Typography>{updatedContactInfo.address}</Typography>
      </Box>
      
      {/* Email with mailto link */}
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
      
      {/* Phone with tel link */}
      <Box display="flex" alignItems="center" mb={2}>
        <Phone sx={{ mr: 1 }} color="primary" />
        <Link
          href={formatPhoneForHref(updatedContactInfo.phone)}
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
      
      {/* WhatsApp with deep link */}
      <Box display="flex" alignItems="center">
        <WhatsApp sx={{ mr: 1 }} color="primary" />
        <Link
          href={formatWhatsAppLink(updatedContactInfo.whatsapp)}
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
};

const Home = () => {
  return (
    <Box sx={{ background: '#f8fbff', minHeight: '100vh', pb: 6 }}>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
     

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
          {/* Quick Links */}
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
                      component={link.internal ? RouterLink : "a"} // Use RouterLink for internal links
                      to={link.internal ? link.url : undefined} // Use 'to' for internal links
                      href={!link.internal ? link.url : undefined} // Use 'href' for external links
                      target={!link.internal ? "_blank" : undefined} // Open external links in a new tab
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

          {/* Contact Info and Map */}
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
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {/* Use the new dynamic Contact Info Component */}
                    <ContactInfoSection />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocationMap />
                  </Grid>
                </Grid>
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