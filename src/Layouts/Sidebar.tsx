import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
  Science as ScienceIcon,
  Domain as DomainIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'About', icon: <InfoIcon />, path: '/about' },
  { text: 'Placements', icon: <SchoolIcon />, path: '/placements' },
  { text: 'Projects', icon: <ScienceIcon />, path: '/research' },
  { text: 'Faculty', icon: <PeopleIcon />, path: '/faculty' },
  { text: 'Academic', icon: <CalendarIcon />, path: '/academic' },
  { text: 'Facilities', icon: <DomainIcon />, path: '/facilities' },
];

const Sidebar = ({ mobileOpen, onClose, darkMode, toggleDarkMode }: SidebarProps) => {
  const location = useLocation();
  const theme = useTheme(); // Access the current theme

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ px: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          CSD & CSIT
        </Typography>
        {/* Theme Toggle Button */}
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: 'grey.700',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper, // Use theme background
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper, // Use theme background
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;