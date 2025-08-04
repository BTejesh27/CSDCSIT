import { useState } from 'react';
import { Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  // Hide sidebar/header on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {!isAdminPage && (
        <>
          <Box
            component="header"
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: '100%',
              position: 'fixed',
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                  CSD & CSIT
                </Typography>
              </Box>
            </Toolbar>
          </Box>
          <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} darkMode={false} toggleDarkMode={function (): void {
            throw new Error('Function not implemented.');
          } } />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: !isAdminPage ? { sm: `calc(100% - ${240}px)` } : '100%',
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          mt: !isAdminPage ? { xs: 8, sm: 0 } : 0, // Adjust margin for mobile view
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;