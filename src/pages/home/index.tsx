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
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Link as LinkIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Close as CloseIcon,
  LocationOn,
  Person,
  CalendarToday,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LocationMap from '../../components/LocationMap';
import NewsItem from '../../components/NewsItem';
import EventItem from '../../components/EventItem';
import ContactInfoSection from '../../components/ContactInfoSection';

// Import the API hooks
import { useEvents } from './api/useEvents';
import { useNews } from './api/useNews';
import quickLinks from './api/quickLinks';

import prajwalan from '../../assests/images/s.jpeg';
import codingchallenge from '../../assests/images/tt.jpg';
import SIHWin from '../../assests/images/SIHWin.jpg';

const heroImages = [prajwalan, codingchallenge, SIHWin];
const HERO_SLIDE_INTERVAL = 4000;
const ITEMS_PER_PAGE = 3;

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

// Helper function to format date for news display
const formatNewsDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

// Helper function to format date for events display
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');
  return { month, day };
};

// Helper function to format full date for event popup
const formatFullEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Event Item Component - Styled like NewsItem
const EventItemStyled = ({ event }: { event: any }) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleEventClick = () => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid #e0e0e0',
            '&:hover': { 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)',
              borderColor: 'primary.main'
            }
          }}
          onClick={handleEventClick}
        >
          <Box sx={{ p: 2 }}>
            {/* Event Header - Same style as news */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              {/* Date Badge - Compact version */}
              <Box
                sx={{
                  minWidth: 50,
                  textAlign: 'center',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: 1,
                  p: 0.5,
                  mr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: '0.6rem', lineHeight: 1 }}>
                  {event.month}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.9rem', lineHeight: 1 }}>
                  {event.day}
                </Typography>
              </Box>
              
              {/* Event Content */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem', lineHeight: 1.2 }}>
                  {event.title}
                </Typography>
                
                {/* Event Meta - Compact tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {event.location && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        backgroundColor: 'grey.100', 
                        px: 0.8, 
                        py: 0.2, 
                        borderRadius: 1,
                        color: 'text.secondary',
                        fontSize: '0.65rem'
                      }}
                    >
                      📍 {event.location}
                    </Typography>
                  )}
                  {event.organizer && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        backgroundColor: 'grey.100', 
                        px: 0.8, 
                        py: 0.2, 
                        borderRadius: 1,
                        color: 'text.secondary',
                        fontSize: '0.65rem'
                      }}
                    >
                      👤 {event.organizer}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              {/* Event Thumbnail - Same size as news */}
              {event.image && (
                <Box
                  component="img"
                  src={event.image}
                  alt={event.title}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: 1,
                    ml: 2,
                    border: '1px solid #e0e0e0'
                  }}
                />
              )}
            </Box>
            
            {/* Event Description - Same truncation as news */}
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
                fontSize: '0.875rem'
              }}
            >
              {event.description}
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Event Modal - Styled like news modal */}
      <EventModal 
        event={selectedEvent}
        open={isEventModalOpen}
        onClose={handleEventModalClose}
      />
    </>
  );
};

// Event Popup Modal Component - Updated to match news style with side-by-side layout
const EventModal = ({ event, open, onClose }: {
  event: any;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog 
    open={open} 
    onClose={onClose} 
    maxWidth="md" 
    fullWidth
    PaperProps={{
      sx: { borderRadius: 3 }
    }}
  >
    <DialogTitle sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      pb: 1
    }}>
      <Typography variant="h5" fontWeight="bold">
        {event?.title}
      </Typography>
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    
    <DialogContent sx={{ p: 3 }}>
      {/* Event Meta Information */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            label={formatFullEventDate(event?.date)}
            color="primary"
            size="small"
            sx={{ fontWeight: 'medium' }}
          />
          {event?.location && (
            <Chip
              label={`📍 ${event.location}`}
              color="secondary"
              size="small"
              variant="outlined"
            />
          )}
          {event?.organizer && (
            <Chip
              label={`👤 ${event.organizer}`}
              color="default"
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Box>

      {/* Content Layout - Image and Description side by side */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* Event Image - Smaller size on the left */}
        {event?.image && (
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={event.image}
              alt={event.title}
              sx={{
                width: '100%',
                maxHeight: 250,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0'
              }}
            />
          </Grid>
        )}
        
        {/* Event Description - On the right side */}
        <Grid item xs={12} md={event?.image ? 8 : 12}>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.7,
              color: 'text.primary',
              fontSize: '1rem'
            }}
          >
            {event?.fullContent || event?.description}
          </Typography>
        </Grid>
      </Grid>
    </DialogContent>
    
    <DialogActions sx={{ p: 3, pt: 1, justifyContent: 'flex-end' }}>
      <Button 
        onClick={onClose} 
        variant="contained" 
        color="primary"
        sx={{ 
          borderRadius: 2,
          px: 3,
          py: 1
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

// Pagination component
const PaginationControls = ({ currentPage, totalPages, onPrevious, onNext, label }: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  label: string;
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
    <IconButton 
      onClick={onPrevious} 
      disabled={currentPage === 1}
      size="small"
    >
      <ArrowBackIos />
    </IconButton>
    
    <Typography variant="body2" color="text.secondary">
      {label} {currentPage} of {totalPages}
    </Typography>
    
    <IconButton 
      onClick={onNext} 
      disabled={currentPage === totalPages}
      size="small"
    >
      <ArrowForwardIos />
    </IconButton>
  </Box>
);

const Home = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  // Pagination states
  const [newsPage, setNewsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  
  // API hooks
  const { data: newsData = [], isLoading: newsLoading, error: newsError } = useNews();
  const { data: eventsData = [], isLoading: eventsLoading, error: eventsError } = useEvents();

  // Format the data for display
  const formattedNews = newsData.map((newsItem, index) => ({
    id: `#${index + 1}`,
    date: formatNewsDate(newsItem.date),
    title: newsItem.title,
    description: newsItem.description,
    image: newsItem.imageUrl || "/images/default-news.jpg",
    fullContent: newsItem.description,
  }));

  const formattedEvents = eventsData.map((event) => {
    const { month, day } = formatEventDate(event.date);
    return {
      month,
      day,
      title: event.title,
      description: event.description,
      image: event.imageUrl || "/images/default-event.jpg",
      fullContent: event.description,
      location: event.location || "TBA",
      organizer: event.organizer || "Department",
      date: event.date,
    };
  });

  // Calculate pagination
  const totalNewsPages = Math.ceil(formattedNews.length / ITEMS_PER_PAGE);
  const totalEventsPages = Math.ceil(formattedEvents.length / ITEMS_PER_PAGE);
  
  const currentNews = formattedNews.slice(
    (newsPage - 1) * ITEMS_PER_PAGE,
    newsPage * ITEMS_PER_PAGE
  );
  
  const currentEvents = formattedEvents.slice(
    (eventsPage - 1) * ITEMS_PER_PAGE,
    eventsPage * ITEMS_PER_PAGE
  );

  // Pagination handlers
  const handleNewsNext = () => {
    if (newsPage < totalNewsPages) setNewsPage(newsPage + 1);
  };
  
  const handleNewsPrevious = () => {
    if (newsPage > 1) setNewsPage(newsPage - 1);
  };
  
  const handleEventsNext = () => {
    if (eventsPage < totalEventsPages) setEventsPage(eventsPage + 1);
  };
  
  const handleEventsPrevious = () => {
    if (eventsPage > 1) setEventsPage(eventsPage - 1);
  };

  // Debug logging
  console.log("🏠 Home page data:", {
    newsData: newsData?.length || 0,
    eventsData: eventsData?.length || 0,
    formattedNews: formattedNews?.length || 0,
    formattedEvents: formattedEvents?.length || 0,
    totalNewsPages,
    totalEventsPages,
    currentNewsPage: newsPage,
    currentEventsPage: eventsPage,
    newsLoading,
    eventsLoading,
    newsError: newsError?.message,
    eventsError: eventsError?.message
  });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSlider />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={4} alignItems="stretch">
          {/* News Section */}
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
            >
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  News ({formattedNews.length})
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {newsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : newsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load news: {newsError.message}
                    <br />
                    <Typography variant="caption">
                      Make sure your backend is running on http://localhost:3000
                    </Typography>
                  </Alert>
                ) : currentNews.length > 0 ? (
                  <>
                    {currentNews.map((item, index) => (
                      <NewsItem key={`news-${item.id || index}`} item={item} />
                    ))}
                    {totalNewsPages > 1 && (
                      <PaginationControls
                        currentPage={newsPage}
                        totalPages={totalNewsPages}
                        onPrevious={handleNewsPrevious}
                        onNext={handleNewsNext}
                        label="Page"
                      />
                    )}
                  </>
                ) : (
                  <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                    No news available
                  </Typography>
                )}
              </Card>
            </motion.div>
          </Grid>
          
          {/* Events Section - Updated to use EventItemStyled */}
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
            >
              <Card elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Events ({formattedEvents.length})
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {eventsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : eventsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load events: {eventsError.message}
                    <br />
                    <Typography variant="caption">
                      Make sure your backend is running on http://localhost:3000
                    </Typography>
                  </Alert>
                ) : currentEvents.length > 0 ? (
                  <>
                    {currentEvents.map((event, index) => (
                      <EventItemStyled key={`event-${event.title || index}`} event={event} />
                    ))}
                    {totalEventsPages > 1 && (
                      <PaginationControls
                        currentPage={eventsPage}
                        totalPages={totalEventsPages}
                        onPrevious={handleEventsPrevious}
                        onNext={handleEventsNext}
                        label="Page"
                      />
                    )}
                  </>
                ) : (
                  <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                    No events available
                  </Typography>
                )}
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
            >
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
            >
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