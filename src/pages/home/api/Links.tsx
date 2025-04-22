// src/components/Links.tsx
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { QuickLinkType } from './types';

interface LinksProps {
  quickLinks: QuickLinkType[];
}

const Links = ({ quickLinks }: LinksProps) => {
  const theme = useTheme();

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
        <LinkIcon 
          color="primary" 
          sx={{ 
            mr: 1,
            fontSize: { xs: '1.5rem', sm: '1.8rem' }
          }} 
        />
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem' } 
          }}
        >
          Quick Links
        </Typography>
      </Box>
      <List>
        {quickLinks.map((link, index) => (
          <ListItem 
            key={index} 
            disablePadding 
            sx={{ 
              mb: 1.5,
              transition: 'all 0.2s ease',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(41, 128, 185, 0.08)',
                transform: 'translateX(5px)'
              }
            }}
            component={link.internal ? RouterLink : "a"}
            to={link.internal ? link.url : undefined}
            href={!link.internal ? link.url : undefined}
            target={!link.internal ? "_blank" : undefined}
            rel={!link.internal ? "noopener noreferrer" : undefined}
          >
            <ListItemIcon>
              <LinkIcon 
                color="primary"
                sx={{
                  transition: 'transform 0.2s ease',
                  '.MuiListItem-root:hover &': {
                    transform: 'rotate(45deg)'
                  }
                }} 
              />
            </ListItemIcon>
            <ListItemText 
              primary={link.name}
              primaryTypographyProps={{
                fontWeight: 'medium',
                sx: {
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
    </motion.div>
  );
};

export default Links;