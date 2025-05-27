import { useState, useEffect, useRef } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

import magicaldbImage from "./images/magicaldb.png";
import boImage from "./images/bo.png";
import srkrImage from "./images/srkr.png";
import svctImage from "./images/svct.png";
import csdImage from "./images/csd.png";
import spellImage from "./images/spell.png";
import coImage from "./images/co.png";
import bonlineImage from "./images/bonline.png";
import bdImage from "./images/bd.png";

// Update projectList and startups to use imported images
const projectList = [
  {
    title: "MagicalDB - HCU",
    image: magicaldbImage,
    link: "http://www.manjarilab.com/manjari/databases/magicaldb/",
  },
  {
    title: "Bhimavaram Tennis",
    image: boImage,
    link: "https://www.bhimavaramtennis.com/",
  },
  {
    title: "SRKR Engineering College",
    image: srkrImage,
    link: "https://srkrec.edu.in/",
  },
  {
    title: "SVCET College Website",
    image: svctImage,
    link: "http://svcet.net/new/",
  },
  {
    title: "CSD Courseware",
    image: csdImage,
    link: "https://csd27.ct.ws/CSD/",
  },
  {
    title: "SpellBee - SRKR",
    image: spellImage,
    link: "https://srkrec.edu.in/spellbee2k24/",
  },
];

const startups = [
  {
    title: "Campus Online",
    description:
      "A specialized database solution developed for Hyderabad Central University to manage research data efficiently.",
    image: coImage,
    link: "https://campusonline.mini.store/",
  },
  {
    title: "Bhimavaram Online",
    description:
      "A comprehensive platform for managing local tennis tournaments, player profiles, and event scheduling.",
    image: bonlineImage,
    link: "https://bhimavaram.online/",
  },
  {
    title: "Bhimavaram Digitals",
    description:
      "The official website for SRKR Engineering College showcasing academic programs, campus facilities, and student achievements.",
    image: bdImage,
    link: "https://www.bhimavaramdigitals.com/",
  },
];

const projectSection = {
  id: "projects",
  title: "Projects",
  description: "Funded initiatives driving innovation and discovery",
  icon: <Lightbulb />,
  image:"https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const startupSection = {
  id: "startups",
  title: "Startups",
  description: "Entrepreneurial ventures transforming ideas into reality",
  icon: <Lightbulb />,
  image:"https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

function App() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0D47A1",
        light: "#5472D3",
        dark: "#002171",
        contrastText: "#ffffff",
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#0D47A1",
        secondary: "#546E7A",
      },
    },
  });

  const muiTheme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId in sectionRefs.current) {
        const section = sectionRefs.current[sectionId];
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: muiTheme.palette.mode === "dark" ? "#000000" : "#ffffff", minHeight: "100vh" }}>
        <Container sx={{ py: 8 }}>
          {/* Projects Section */}
          <Box ref={(el) => (sectionRefs.current[projectSection.id] = el)} mb={6}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: muiTheme.palette.text.primary,
              }}
            >
              {projectSection.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              mb={4}
              sx={{
                color: muiTheme.palette.text.secondary,
              }}
            >
              {projectSection.description}
            </Typography>
            {/* Gallery for Projects */}
            <Grid container spacing={4}>
              {projectList.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: muiTheme.palette.background.paper,
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
                        color: muiTheme.palette.text.primary,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Button
                      href={project.link}
                      target="_blank"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        bgcolor: muiTheme.palette.primary.main,
                        color: muiTheme.palette.primary.contrastText,
                      }}
                    >
                      Visit Project
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Startups Section */}
          <Box ref={(el) => (sectionRefs.current[startupSection.id] = el)} mb={6}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: muiTheme.palette.text.primary,
              }}
            >
              {startupSection.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              mb={4}
              sx={{
                color: muiTheme.palette.text.secondary,
              }}
            >
              {startupSection.description}
            </Typography>
            {/* Gallery for Startups */}
            <Grid container spacing={4}>
              {startups.map((startup, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: muiTheme.palette.background.paper,
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
                        color: muiTheme.palette.text.primary,
                      }}
                    >
                      {startup.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mb={2}
                      sx={{
                        color: muiTheme.palette.text.secondary,
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
                        bgcolor: muiTheme.palette.primary.main,
                        color: muiTheme.palette.primary.contrastText,
                      }}
                    >
                      Visit Startup
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
