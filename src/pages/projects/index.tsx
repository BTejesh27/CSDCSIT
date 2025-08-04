import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  Paper
} from '@mui/material';
import { ExternalLink } from 'lucide-react';

import { useProjects } from './api/useProjects';
import { useStartups } from './api/useStartups';

const ProjectsSection = () => {
  const theme = useTheme();

  // Fetch projects and startups from API
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: startups, isLoading: startupsLoading } = useStartups();

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
          {projectsLoading ? (
            <Grid item xs={12}><Typography>Loading projects...</Typography></Grid>
          ) : projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project._id || index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                  }}
                >
                  {/* Show project page in iframe if link exists */}
                  {project.link && (
                    <Box sx={{ mb: 2 }}>
                      <iframe
                        src={project.link}
                        title={project.title}
                        width="100%"
                        height={200}
                        style={{ border: '1px solid #eee', borderRadius: 8 }}
                        loading="lazy"
                      />
                    </Box>
                  )}
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
                  {project.link && (
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
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Year: {project.year}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}><Typography>No projects found.</Typography></Grid>
          )}
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
          {startupsLoading ? (
            <Grid item xs={12}><Typography>Loading startups...</Typography></Grid>
          ) : startups && startups.length > 0 ? (
            startups.map((startup, index) => (
              <Grid item xs={12} sm={6} md={4} key={startup._id || index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                  }}
                >
                  {/* Show startup page in iframe if link exists */}
                  {startup.link && (
                    <Box sx={{ mb: 2 }}>
                      <iframe
                        src={startup.link}
                        title={startup.title}
                        width="100%"
                        height={200}
                        style={{ border: '1px solid #eee', borderRadius: 8 }}
                        loading="lazy"
                      />
                    </Box>
                  )}
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
                  {startup.link && (
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
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Year: {startup.year}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}><Typography>No startups found.</Typography></Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectsSection;