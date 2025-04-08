import { Box, Container, Typography, Paper, Grid, Card, CardContent, Avatar } from '@mui/material';

const Faculty = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Faculty
        </Typography>

        {/* Faculty List */}
        <Grid container spacing={4}>
          {/* Sample Faculty Member */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mr: 2 }}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  />
                  <Box>
                    <Typography variant="h3">Dr. Sarah Johnson</Typography>
                    <Typography color="textSecondary">Professor & HOD</Typography>
                  </Box>
                </Box>
                <Typography variant="h4" gutterBottom>
                  Qualifications
                </Typography>
                <Typography>Ph.D. in Computer Science, MIT</Typography>
                <Typography gutterBottom>M.Tech in AI, Stanford University</Typography>
                
                <Typography variant="h4" gutterBottom>
                  Research Interests
                </Typography>
                <Typography>
                  Artificial Intelligence, Machine Learning, Computer Vision
                </Typography>
                
                <Typography variant="h4" sx={{ mt: 2 }} gutterBottom>
                  Contact
                </Typography>
                <Typography>Email: sarah.johnson@university.edu</Typography>
                <Typography>Office: Room 301, CS Building</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Another Faculty Member */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mr: 2 }}
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  />
                  <Box>
                    <Typography variant="h3">Dr. Michael Chen</Typography>
                    <Typography color="textSecondary">Associate Professor</Typography>
                  </Box>
                </Box>
                <Typography variant="h4" gutterBottom>
                  Qualifications
                </Typography>
                <Typography>Ph.D. in Data Science, Berkeley</Typography>
                <Typography gutterBottom>M.S. in Computer Science, UCLA</Typography>
                
                <Typography variant="h4" gutterBottom>
                  Research Interests
                </Typography>
                <Typography>
                  Big Data Analytics, Cloud Computing, Distributed Systems
                </Typography>
                
                <Typography variant="h4" sx={{ mt: 2 }} gutterBottom>
                  Contact
                </Typography>
                <Typography>Email: michael.chen@university.edu</Typography>
                <Typography>Office: Room 302, CS Building</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Publications Section */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h2" gutterBottom>
            Recent Publications
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>
              "Advanced Machine Learning Algorithms for Big Data Processing" - International Journal of Computer Science, 2024
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              "Novel Approaches in Cloud Computing Security" - IEEE Transactions, 2024
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              "Artificial Intelligence in Education: A Case Study" - Education Technology Review, 2023
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Faculty;