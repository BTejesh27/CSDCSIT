import { Box, Container, Typography, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          About the Department
        </Typography>

        {/* Vision & Mission */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Vision & Mission
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" gutterBottom>
              Vision
            </Typography>
            <Typography>
              To be a globally recognized center of excellence in computer science education,
              research, and innovation.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom>
              Mission
            </Typography>
            <Typography>
              To provide quality education, foster innovative research, and develop
              industry-ready professionals who contribute to technological advancement
              and societal progress.
            </Typography>
          </Box>
        </Paper>

        {/* Department History */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Department History
          </Typography>
          <Typography>
            Established in 2000, our department has grown from a small program to
            a comprehensive center for computer science education and research.
            Over the years, we have consistently evolved our curriculum and
            facilities to meet the changing demands of the technology industry.
          </Typography>
        </Paper>

        {/* Message from HOD */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Message from HOD
          </Typography>
          <Typography>
            "Welcome to the Department of CSD & CSIT. Our department is committed
            to providing world-class education and research opportunities. We focus
            on nurturing talent and fostering innovation through our comprehensive
            curriculum and state-of-the-art facilities."
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            - Dr. Jane Smith, Head of Department
          </Typography>
        </Paper>

        {/* Accreditation & Achievements */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Accreditation & Achievements
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Accreditations
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li">NAAC A+ Grade</Typography>
                <Typography component="li">NBA Accredited Programs</Typography>
                <Typography component="li">ISO 9001:2015 Certified</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Recent Achievements
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li">Best Department Award 2024</Typography>
                <Typography component="li">100% Placement Record</Typography>
                <Typography component="li">5 Patents Filed in 2024</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;