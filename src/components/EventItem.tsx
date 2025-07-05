import { useState, useCallback } from 'react';
import { Box, Typography, Modal, Grid, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

interface EventItemProps {
  event: {
    month: string;
    day: string;
    title: string;
    description: string;
    image?: string;
    images?: string[];
    fullContent?: string;
  };
}

const EventItem = ({ event }: EventItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

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
            <Grid item xs={12} sm={5}>
              <Box
                component="img"
                src={event.image ? event.image.replace(/^public\//, "/") : "/default.jpg"}
                alt={event.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
                }}
              />
            </Grid>
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

export default EventItem;