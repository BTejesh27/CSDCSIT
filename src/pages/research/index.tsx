import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  useTheme
} from '@mui/material';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import magicaldbImage from "./images/magicaldb.png";
import boImage from "./images/bo.png";
import srkrImage from "./images/srkr.png";
import svctImage from "./images/svct.png";
import csdImage from "./images/csd.png";
import spellImage from "./images/spell.png";
import coImage from "./images/co.png";
import bonlineImage from "./images/bonline.png";
import bdImage from "./images/bd.png";
import yuppiesBanner from "c:/Users/Megana Arnepalli/Downloads/Yuppies Collage General LinkdIn Banner.jpg";

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
    image: yuppiesBanner
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
      <SectionHeader 
        title={sectionData.projects.title}
        description={sectionData.projects.description}
      />
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
        <Box mt={4}>
          <Grid container spacing={3}>
            {projectList.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.12, type: "spring" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={project.image}
                      alt={project.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <motion.div whileTap={{ scale: 0.97 }}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<ExternalLink size={16} />}
                        >
                          Visit Project
                        </Button>
                      </motion.div>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>

      {/* Startups */}
      <SectionHeader 
        title={sectionData.startups.title}
        description={sectionData.startups.description}
      />
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
        <Box mt={4}>
          <Grid container spacing={3}>
            {startupList.map((startup, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.12, type: "spring" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={startup.image}
                      alt={startup.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {startup.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {startup.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <motion.div whileTap={{ scale: 0.97 }}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          href={startup.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<ExternalLink size={16} />}
                        >
                          Visit Startup
                        </Button>
                      </motion.div>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProjectsSection;