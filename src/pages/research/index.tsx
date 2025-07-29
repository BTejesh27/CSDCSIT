import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  Paper
} from '@mui/material';
import { ExternalLink } from 'lucide-react';
import magicaldbImage from "./images/magicaldb.png";
import boImage from "./images/bo.png";
import srkrImage from "./images/srkr.png";
import svctImage from "./images/svct.png";
import csdImage from "./images/csd.png";
import spellImage from "./images/spell.png";
import coImage from "./images/co.png";
import bonlineImage from "./images/bonline.png";
import bdImage from "./images/bd.png";

// Replace the image below with your professional image URL or import

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




const ProjectsSection = () => {
  const theme = useTheme();
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
          Projects
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={theme.palette.text.secondary}
        >
          Explore our research projects.
        </Typography>
      </Box>
    
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

      {/* Startups */}
      <Box mt={8} mb={2}>
        <Typography 
          variant="h4" 
          fontWeight={600} 
          color={theme.palette.primary.main}
          gutterBottom
        >
          Startups
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={theme.palette.text.secondary}
        >
          Entrepreneurial ventures transforming ideas into reality.
        </Typography>
      </Box>
     
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
    </Box>
  );
};

export default ProjectsSection;