import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Collapse,
  useTheme,
  Paper
} from '@mui/material';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import magicaldbImage from "./images/magicaldb.png";
import boImage from "./images/bo.png";
import srkrImage from "./images/srkr.png";
import svctImage from "./images/svct.png";
import csdImage from "./images/csd.png";
import spellImage from "./images/spell.png";
import coImage from "./images/co.png";
import bonlineImage from "./images/bonline.png";
import bdImage from "./images/bd.png";
import startupsImage from "./images/startups.jpg";

// Replace the image below with your professional image URL or import
const professionalProjectImage = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"; // Example Unsplash image

export const projectList = [
  {
    title: "MagicalDB - HCU",
    description: "A specialized database solution developed for Hyderabad Central University to manage research data efficiently.",
    image: magicaldbImage,
    link: "http://www.manjarilab.com/manjari/databases/magicaldb/",
  },
  {
    title: "Bhimavaram Tennis",
    description: "A comprehensive platform for managing local tennis tournaments, player profiles, and event scheduling.",
    image: boImage,
    link: "https://www.bhimavaramtennis.com/",
  },
  {
    title: "SRKR Engineering College",
    description: "The official website for SRKR Engineering College showcasing academic programs, campus facilities, and student achievements.",
    image: srkrImage,
    link: "https://srkrec.edu.in/",
  },
  {
    title: "SVCET College Website",
    description: "Website for SVCET College.",
    image: svctImage,
    link: "http://svcet.net/new/",
  },
  {
    title: "CSD Courseware",
    description: "CSD courseware and resources.",
    image: csdImage,
    link: "https://csd27.ct.ws/CSD/",
  },
  {
    title: "SpellBee - SRKR",
    description: "SpellBee event at SRKR.",
    image: spellImage,
    link: "https://srkrec.edu.in/spellbee2k24/",
  },
];

export const startupList = [
  {
    title: "Campus Online",
    description: "A specialized database solution developed for Hyderabad Central University to manage research data efficiently.",
    image: coImage,
    link: "https://campusonline.mini.store/",
  },
  {
    title: "Bhimavaram Online",
    description: "A comprehensive platform for managing local tennis tournaments, player profiles, and event scheduling.",
    image: bonlineImage,
    link: "https://bhimavaram.online/",
  },
  {
    title: "Bhimavaram Digitals",
    description: "The official website for SRKR Engineering College showcasing academic programs, campus facilities, and student achievements.",
    image: bdImage,
    link: "https://www.bhimavaramdigitals.com/",
  },
];

export const sectionData = {
  projects: {
    title: "Projects",
    description: "Explore our research projects.",
    image: professionalProjectImage
  },
  startups: {
    title: "Startups",
    description: "Entrepreneurial ventures transforming ideas into reality.",
    image: startupsImage
  }
};

const ProjectsSection = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showStartups, setShowStartups] = useState(false);
  const theme = useTheme();

  const toggleProjects = () => setShowProjects((prev) => !prev);
  const toggleStartups = () => setShowStartups((prev) => !prev);

  return (
    <Box component="section" mb={10}>
      {/* Projects */}
      <Box mb={2}>
        <Typography 
          variant="h4" 
          fontWeight={600} 
          color={theme.palette.primary.main}
          gutterBottom
        >
          {sectionData.projects.title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={theme.palette.text.secondary}
        >
          {sectionData.projects.description}
        </Typography>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 250, sm: 300, md: 400 },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
            boxShadow: theme.shadows[4],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{ height: "100%" }}
          >
            <Box
              component="img"
              src={sectionData.projects.image}
              alt={sectionData.projects.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold">
                {sectionData.projects.title}
              </Typography>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={toggleProjects}
                  endIcon={showProjects ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {showProjects ? 'Hide Projects' : 'View Projects'}
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      <Collapse in={showProjects} timeout={700}>
        <Box mt={6} p={2}>
          <Grid container spacing={4}>
            {projectList.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                  }}
                >
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    mb={2}
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Button
                    href={project.link}
                    target="_blank"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                    endIcon={<ExternalLink size={16} />}
                  >
                    Visit Project
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>

      {/* Startups */}
      <Box mt={8} mb={2}>
        <Typography 
          variant="h4" 
          fontWeight={600} 
          color={theme.palette.primary.main}
          gutterBottom
        >
          {sectionData.startups.title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={theme.palette.text.secondary}
        >
          {sectionData.startups.description}
        </Typography>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
            boxShadow: theme.shadows[4],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{ height: "100%" }}
          >
            <Box
              component="img"
              src={sectionData.startups.image}
              alt={sectionData.startups.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold">
                {sectionData.startups.title}
              </Typography>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={toggleStartups}
                  endIcon={showStartups ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {showStartups ? 'Hide Startups' : 'View Startups'}
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      <Collapse in={showStartups} timeout={700}>
        <Box mt={6} p={2}>
          <Grid container spacing={4}>
            {startupList.map((startup, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                  }}
                >
                  <Box
                    component="img"
                    src={startup.image}
                    alt={startup.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    {startup.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    mb={2}
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {startup.description}
                  </Typography>
                  <Button
                    href={startup.link}
                    target="_blank"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                    endIcon={<ExternalLink size={16} />}
                  >
                    Visit Startup
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProjectsSection;