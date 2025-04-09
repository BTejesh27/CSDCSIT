import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { title, departmentOverview, announcements, quickLinks, contactInfo } from './api/home';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            {departmentOverview.title}
          </Typography>
          <Typography>{departmentOverview.description}</Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h2" gutterBottom>
                Announcements & News
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {announcements.map((announcement, index) => (
                  <Typography component="li" key={index} sx={{ mb: 1 }}>
                    {announcement}
                  </Typography>
                ))}
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
                {quickLinks.map((link, index) => (
                  <Typography component="li" key={index} sx={{ mb: 1 }}>
                    {link}
                  </Typography>
                ))}
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
            {contactInfo.address}
            <br />
            Email: {contactInfo.email}
            <br />
            Phone: {contactInfo.phone}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;