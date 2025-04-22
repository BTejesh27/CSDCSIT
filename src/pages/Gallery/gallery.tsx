import { useState, useRef, useEffect } from 'react';
import { Box, Modal, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PlayCircle, Close, Fullscreen, FullscreenExit } from '@mui/icons-material';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

const Gallery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sample YouTube videos - replace with your actual video links
  const videos: VideoItem[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Campus Tour',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
      id: '9bZkp7q19f0',
      title: 'Annual Fest',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg'
    },
    {
      id: 'JGwWNGJdvx8',
      title: 'Tech Symposium',
      thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Sports Day',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
    },
    {
      id: 'RgKAFK5djSk',
      title: 'Cultural Event',
      thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/hqdefault.jpg'
    },
    {
      id: 'OPf0YbXqDm0',
      title: 'Guest Lecture',
      thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg'
    }
  ];

  const handleOpen = (video: VideoItem) => {
    setCurrentVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
      if (e.key === 'f' && open) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Video Gallery
      </Typography>
      
      {/* Bento Grid Layout */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 2,
        '& > div:nth-of-type(1)': { gridRow: 'span 2', gridColumn: 'span 1' },
        '& > div:nth-of-type(4)': { gridColumn: 'span 2' },
        '& > div:nth-of-type(6)': { gridRow: 'span 2' }
      }}>
        {videos.map((video, index) => (
          <Box
            key={video.id}
            onClick={() => handleOpen(video)}
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                '& .play-icon': {
                  transform: 'scale(1.1)',
                  opacity: 1
                }
              },
              aspectRatio: index % 3 === 0 ? '3/4' : index === 3 ? '16/7' : '16/9'
            }}
          >
            <Box
              component="img"
              src={video.thumbnail}
              alt={video.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <Box
              className="play-icon"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                opacity: 0.9,
                transition: 'all 0.3s',
                fontSize: '4rem'
              }}
            >
              <PlayCircle fontSize="inherit" />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                p: 2,
                color: 'white'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {video.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Video Player Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Box sx={{
          width: isFullscreen ? '100vw' : isMobile ? '90vw' : '70vw',
          height: isFullscreen ? '100vh' : isMobile ? '50vh' : '70vh',
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: isFullscreen ? 0 : 2,
          overflow: 'hidden',
          boxShadow: 24
        }}>
          {/* Video Player */}
          <Box
            component="iframe"
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${currentVideo?.id}?autoplay=1&rel=0&modestbranding=1`}
            sx={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Controls */}
          <Box sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            gap: 1,
            zIndex: 1
          }}>
            <IconButton
              onClick={toggleFullscreen}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>
          
          {/* Video Title */}
          {!isFullscreen && (
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              color: 'white'
            }}>
              <Typography variant="h6">
                {currentVideo?.title}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery;