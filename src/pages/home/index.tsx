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
  Link,
} from '@mui/material';
import {
  Link as LinkIcon,
  Email,
  Phone,
  LocationOn,
  WhatsApp,
  Close,
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import images with proper error handling
import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';
import bhargaviImage from '../../assests/images/bhargavi.jpg';
import Project_expo1 from '../../assests/images/Project_expo1.jpg';
import Project_expo2 from '../../assests/images/Project_expo2.jpg';
import Project_expo3 from '../../assests/images/Project_expo3.jpg';
import placement1 from '../../assests/images/placement1.jpg';

// Memoized hero images array to prevent unnecessary re-renders
const heroImages = [prajwalan, codingchallenge, SIHWin];

// Constants for better maintainability
const HERO_SLIDE_INTERVAL = 4000; // 4 seconds
const IMAGE_SLIDER_INTERVAL = 3000; // 3 seconds

// Updated Contact Info with proper typing
interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
}

const updatedContactInfo: ContactInfo = {
  address: "SRKR Engineering College Chinnamiram, Bhimavaram, Andhra Pradesh 534204, India",
  email: "suresh.mudunuri@srkrec.edu.in",
  phone: "+919866600002",
  whatsapp: "+919866600002",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=SRKR%20Engineering%20College%20Chinnamiram%2C%20Bhimavaram%2C%20Chinamiram%20Rural%2C%20Andhra%20Pradesh%20534204%2C%20India",
};

// Enhanced interfaces for better type safety
interface NewsItem {
  id?: string;
  date: string;
  title: string;
  description: string;
  image: string;
  fullContent: string;
}

interface EventItem {
  month: string;
  day: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  fullContent: string;
}

interface QuickLink {
  name: string;
  url: string;
  internal: boolean;
}

// News data with proper typing and validation
const newsItems: NewsItem[] = [
  {
    id: "#1",
    date: "6-May-2025",
    title: "Big Congratulations to Our Atelia Health Selections!",
    description: "We are thrilled to celebrate the success of our talented students from 4/4 CSD, SRKR Engineering College, who have been selected as Full Stack Developers at Atelia Software India Pvt Ltd with a 4 LPA package and ₹15,000 monthly stipend.",
    image: placement1,
    fullContent: `We are thrilled to celebrate the success of our talented students from 4/4 CSD, SRKR Engineering College, who have been selected as Full Stack Developers at Atelia Software India Pvt Ltd with a 4 LPA package and ₹15,000 monthly stipend:

Reddi Sahithi (21B91A6244)
Byri Rohit (21B91A6205)
Revathi Pathiwada (21B91A6238)

Your dedication, skills, and consistent efforts have earned you this remarkable opportunity. We are proud of your achievement and wish you continued success in your tech careers!`,
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

// Events data with enhanced validation
const eventItems: EventItem[] = [
  {
    month: "May",
    day: "04",
    title: "Project Expo 2025",
    description: "The Department of Computer Science & Information Technology at SRKR Engineering College is excited to announce the annual Project Expo 2025, a platform for students to showcase their innovative projects and research work.",
    images: [Project_expo1, Project_expo2, Project_expo3], // Multiple images for slider
    image: Project_expo1, // Fallback for non-slider display
    fullContent: "The Department of Computer Science & Information Technology at SRKR Engineering College is excited to announce the annual Project Expo 2025, a platform for students to showcase their innovative projects and research work. This comprehensive exhibition will feature final year projects from all engineering departments, with special focus on cutting-edge technologies like AI, Machine Learning, IoT, and Blockchain. Industry experts will evaluate the projects and provide valuable feedback to students. The expo also includes workshops on emerging technologies, career guidance sessions, and networking opportunities with industry professionals. Students will have the chance to present their innovative solutions to real-world problems and compete for attractive prizes and recognition."
  },
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

// Quick links with proper typing
const quickLinks: QuickLink[] = [
  { name: "Attendance", url: "http://43.250.40.63/Login.aspx?ReturnUrl=%2fStudentLogin%2f", internal: false },
  { name: "CSD Net", url: "http://www.mcr.org.in/csdnet/add_leave.php", internal: false },
  { name: "SRKR web portal", url: "https://srkrexams.in/", internal: false },
  { name: "Academic Calendar", url: "/academic", internal: true },
  { name: "Faculty Resources", url: "/faculty", internal: true },
  { name: "Research Publications", url: "https://example.com/research-publications", internal: false },
];

// Enhanced Hero component with error handling
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Memoized background image URL with error handling
  const backgroundImageUrl = useMemo(() => {
    try {
      return `url(${heroImages[currentImageIndex]})`;
    } catch (error) {
      console.error('Error loading hero image:', error);
      setImageLoadError(true);
      return 'url(https://via.placeholder.com/1920x1080?text=Loading...)';
    }
  }, [currentImageIndex]);

  useEffect(() => {
    // Prevent interval if there's an image error
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

// Enhanced Location Map Component with error handling
const LocationMap = () => {
  const [mapError, setMapError] = useState(false);

  const handleMapError = useCallback(() => {
    setMapError(true);
    console.error('Error loading Google Maps iframe');
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

// Enhanced Image Slider Component with better error handling
interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Validate images array
  const validImages = useMemo(() => {
    return images.filter(img => img && typeof img === 'string');
  }, [images]);

  // Handle image load errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
    console.error(`Error loading image at index ${index}:`, validImages[index]);
  }, [validImages]);

  // Auto-play functionality with error handling
  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length);
    }, IMAGE_SLIDER_INTERVAL);

    return () => clearInterval(interval);
  }, [validImages.length]);

  // Navigation functions with bounds checking
  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  // Handle invalid images
  if (!validImages.length) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: 200, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        borderRadius: 2
      }}>
        <Typography color="text.secondary">No images available</Typography>
      </Box>
    );
  }

  // Single image display
  if (validImages.length === 1) {
    return (
      <Box
        component="img"
        src={validImages[0]}
        alt={alt}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          objectFit: 'cover',
        }}
        onError={() => handleImageError(0)}
      />
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
      {/* Main slider container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Current image display with error handling */}
        {imageErrors.has(currentSlide) ? (
          <Box
            sx={{
              width: '100%',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography color="text.secondary">Image unavailable</Typography>
          </Box>
        ) : (
          <Box
            component="img"
            src={validImages[currentSlide]}
            alt={`${alt} - Image ${currentSlide + 1}`}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              transition: 'opacity 0.5s ease-in-out',
            }}
            onError={() => handleImageError(currentSlide)}
          />
        )}

        {/* Navigation arrows */}
        <IconButton
          onClick={goToPrevious}
          aria-label="Previous image"
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            zIndex: 2,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          onClick={goToNext}
          aria-label="Next image"
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            zIndex: 2,
          }}
        >
          <ArrowForwardIos />
        </IconButton>

        {/* Slide indicators (dots) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 2,
          }}
        >
          {validImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${index + 1}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setCurrentSlide(index);
                }
              }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            />
          ))}
        </Box>

        {/* Image counter display */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
            fontSize: '0.875rem',
            zIndex: 2,
          }}
        >
          {currentSlide + 1} / {validImages.length}
        </Box>
      </Box>
    </Box>
  );
};

// Enhanced News Item Component
interface NewsItemProps {
  item: NewsItem;
}

const NewsItem = ({ item }: NewsItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Handle keyboard interaction for accessibility
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOpen();
    }
  }, [handleOpen]);

  return (
    <>
      <Box 
        mb={3} 
        sx={{ cursor: 'pointer' }} 
        onClick={handleOpen}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
        aria-label={`Read more about ${item.title}`}
      >
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

      {/* Enhanced Modal Popup for News */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-description"
        closeAfterTransition
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
            aria-label="close modal"
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
                onError={(e) => {
                  console.error('Error loading news image:', item.image);
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
                }}
              />
            </Grid>
            
            {/* Content on the right */}
            <Grid item xs={12} sm={7}>
              <Typography id="news-modal-title" variant="h5" component="h2" fontWeight="bold" color="primary" mb={2}>
                {item.title}
              </Typography>
              <Typography id="news-modal-description" variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {item.fullContent}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

// Enhanced Event Item Component
interface EventItemProps {
  event: EventItem;
}

const EventItem = ({ event }: EventItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Handle keyboard interaction for accessibility
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleOpen();
    }
  }, [handleOpen]);

  return (
    <>
      <Box 
        mb={4} 
        display="flex" 
        sx={{ cursor: 'pointer' }} 
        onClick={handleOpen}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
        aria-label={`Learn more about ${event.title}`}
      >
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

      {/* Enhanced Modal Popup for Events */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
        closeAfterTransition
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
            aria-label="close modal"
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
            {/* Image/Slider on the left */}
            <Grid item xs={12} sm={5}>
              {/* Conditional rendering: Show slider for events with multiple images */}
              {event.images && event.images.length > 1 ? (
                <ImageSlider images={event.images} alt={event.title} />
              ) : (
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
                  onError={(e) => {
                    console.error('Error loading event image:', event.image);
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
                  }}
                />
              )}
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

// Enhanced Contact Info Component with error handling
const ContactInfoSection = () => {
  // Utility functions with validation
  const formatPhoneForHref = useCallback((phone: string) => {
    try {
      return `tel:${phone}`;
    } catch (error) {
      console.error('Error formatting phone number:', error);
      return '#';
    }
  }, []);

  const formatWhatsAppLink = useCallback((phone: string) => {
    try {
      const phoneNumber = phone.replace('+91', '').replace(/\D/g, ''); // Remove non-digits
      return `https://wa.me/91${phoneNumber}`;
    } catch (error) {
      console.error('Error formatting WhatsApp link:', error);
      return '#';
    }
  }, []);

  return (
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

// Main Home Component with enhanced structure
const Home = () => {
  // Memoized current year to prevent unnecessary recalculations
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* News and Events Section */}
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
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  News
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {newsItems.map((item, index) => (
                  <NewsItem key={`news-${index}`} item={item} />
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
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Events
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {eventItems.map((event, index) => (
                  <EventItem key={`event-${index}`} event={event} />
                ))}
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Quick Links and Contact Info Section */}
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
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
            &copy; {currentYear} CSD & CSIT Department. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;