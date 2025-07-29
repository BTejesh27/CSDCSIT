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
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
  Science as ScienceIcon,
  Domain as DomainIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import historyImage from "../assests/images/csdlogo.jpeg";
import { text } from "framer-motion/client";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "About", icon: <InfoIcon />, path: "/about" },
  { text: "Placements", icon: <SchoolIcon />, path: "/placements" },
  { text: "Projects", icon: <ScienceIcon />, path: "/research" },
  { text: "Faculty", icon: <PeopleIcon />, path: "/faculty" },
  { text: "Syllabus", icon: <SchoolIcon />, path: "/syllabus" },
  { text: "Academic", icon: <CalendarIcon />, path: "/academic" },
  { text: "Facilities", icon: <DomainIcon />, path: "/facilities" },
];

const Sidebar = ({
  mobileOpen,
  onClose,
  darkMode,
  toggleDarkMode,
}: SidebarProps) => {
  const location = useLocation();
  const theme = useTheme();

  // Hide sidebar on /admin (admin login) route
  if (location.pathname === "/admin") {
    return null;
  }

  const drawer = (
    <Box
      sx={{
        mt: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
          CSD & CSIT
        </Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: 0, overflowY: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                    "& .MuiListItemText-primary": {
                      color: "primary.main",
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "grey.700",
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
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={historyImage}
          alt="Logo"
          style={{ width: "80%", maxWidth: 120, borderRadius: 8 }}
        />
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
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
