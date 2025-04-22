// src/components/News.tsx
import { 
  Box, 
  Typography, 
  Divider, 
  Modal, 
  IconButton, 
  Grid,
  useTheme 
} from '@mui/material';
import { Close, AccessTime, Flag } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NewsItemType } from './types';

interface NewsProps {
  newsItems: NewsItemType[];
}

const NewsItem = ({ item }: { item: NewsItemType }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box 
        mb={3} 
        sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          p: 1,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'rgba(41, 128, 185, 0.05)',
            transform: 'translateX(5px)'
          } 
        }} 
        onClick={handleOpen}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <AccessTime fontSize="small" sx={{ mr: 0.5, fontSize: '0.8rem' }} />
                {item.date}
              </Typography>
              {item.id && (
                <Typography variant="body2" color="error" fontWeight="bold">
                  {item.id}
                </Typography>
              )}
            </Box>
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ 
                fontWeight: 'bold', 
                fontSize: '1rem',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.dark
                }
              }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
      </Box>

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
          
          <Typography variant="caption" display="block" color="text.secondary" mb={2}>
            {item.date}
          </Typography>
          
          <Grid container spacing={3}>
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
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={7}>
              <Typography 
                id="news-modal-title" 
                variant="h5" 
                component="h2" 
                fontWeight="bold" 
                color="primary" 
                mb={2}
              >
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

const News = ({ newsItems }: NewsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}
      >
        <Flag 
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
          News
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      {newsItems.map((item, index) => (
        <NewsItem key={index} item={item} />
      ))}
    </motion.div>
  );
};

export default News;