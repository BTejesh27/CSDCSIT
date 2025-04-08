import { Box, Container, Grid, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Welcome to CSD & CSIT Department
        </Typography>
        
        {/* Department Overview */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Department Overview
          </Typography>
          <Typography>
            The Department of Computer Science & Design and Computer Science & Information Technology
            is committed to excellence in teaching, research, and innovation.
          </Typography>
        </Paper>

        {/* Announcements */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h2" gutterBottom>
                Announcements & News
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>
                  New Research Lab Opening Ceremony - March 15, 2025
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  International Conference on Emerging Technologies - April 2025
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Summer Internship Program Registration Open
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h2" gutterBottom>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>
                  Academic Calendar
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Student Portal
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Research Publications
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Faculty Directory
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Information */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h2" gutterBottom>
            Contact Information
          </Typography>
          <Typography>
            Department of CSD & CSIT<br />
            University Campus<br />
            Email: csd.csit@university.edu<br />
            Phone: +1 234 567 8900
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;