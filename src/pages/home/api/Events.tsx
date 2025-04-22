// src/components/Events.tsx
import { 
    Box, 
    Typography, 
    Divider, 
    Modal, 
    IconButton, 
    Grid,
    useTheme 
  } from '@mui/material';
  import { Close, Event } from '@mui/icons-material';
  import { motion } from 'framer-motion';
  import { useState } from 'react';
  import { EventItemType } from './types';
  
  interface EventsProps {
    eventItems: EventItemType[];
  }
  
  const EventItem = ({ event }: { event: EventItemType }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
  
    const formatMonth = (month: string) => {
      if (month.length > 4) {
        return month.substring(0, 3) + ".";
      }
      return month;
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <Box 
          mb={4} 
          display="flex" 
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            } 
          }} 
          onClick={handleOpen}
        >
          <Box sx={{ position: 'relative', width: { xs: '80px', sm: '90px' }, mr: 2 }}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '100%',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    fontSize: { xs: '0.6rem', sm: '0.7rem' },
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    lineHeight: 1,
                    padding: '2px 4px',
                    mb: 0.5
                  }}
                >
                  {formatMonth(event.month)}
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    lineHeight: 1
                  }}
                >
                  {event.day}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box>
            <Typography 
              variant="h6" 
              color="primary" 
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.dark
                }
              }}
            >
              {event.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.9rem' }
              }}
            >
              {event.description}
            </Typography>
          </Box>
        </Box>
  
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
            width: { xs: '95%', sm: '85%', md: '75%' },
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
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
            
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 500, lineHeight: 1 }}>
                  {formatMonth(event.month)}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                  {event.day}
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                fontWeight="medium" 
                color="text.secondary"
              >
                {event.day} {event.month}
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
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
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={7}>
                <Typography 
                  id="event-modal-title" 
                  variant="h5" 
                  component="h2" 
                  fontWeight="bold" 
                  color="primary" 
                  mb={2}
                >
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
  
  const Events = ({ eventItems }: EventsProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2
          }}
        >
          <Event 
            color="primary" 
            sx={{ 
              mr: 1,
              fontSize: { xs: '1.5rem', sm: '1.8rem' }
            }} 
          />
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' } 
            }}
          >
            Events
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        {eventItems.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </motion.div>
    );
  };
  
  export default Events;