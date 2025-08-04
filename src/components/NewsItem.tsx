import { useState, useCallback } from 'react';
import { Box, Typography, Divider, Modal, Grid, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

interface NewsItemProps {
  item: {
    id?: string;
    title: string;
    date: string;
    description: string;
    image?: string;
    fullContent?: string;
  };
}

const NewsItem = ({ item }: NewsItemProps) => {
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
        mb={3}
        sx={{ cursor: 'pointer' }}
        onClick={handleOpen}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
        aria-label={`Read more about ${item.title}`}
      >
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
        <Divider sx={{ mt: 2 }} />
      </Box>

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
            <Grid item xs={12} sm={5}>
              <Box
                component="img"
                src={item.image ? item.image.replace(/^public\//, "/") : "/default.jpg"}
                alt={item.title}
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

export default NewsItem;