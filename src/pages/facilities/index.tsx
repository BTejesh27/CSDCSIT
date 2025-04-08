import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Facilities = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Facilities
        </Typography>

        {/* Laboratories */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Laboratories
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  alt="AI Lab"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    AI & Machine Learning Lab
                  </Typography>
                  <Typography>
                    State-of-the-art facility equipped with high-performance computing
                    systems, GPU clusters, and specialized AI development tools.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b"
                  alt="Network Lab"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Networks & Security Lab
                  </Typography>
                  <Typography>
                    Advanced networking equipment, security testing tools, and
                    simulation software for practical training.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Library Resources */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Library Resources
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Digital Library
                  </Typography>
                  <Typography>
                    Access to international journals, e-books, and research papers
                    through subscriptions to IEEE, ACM, and Springer.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Physical Library
                  </Typography>
                  <Typography>
                    Over 10,000 books, reference materials, and periodicals
                    covering all aspects of computer science and technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Department Infrastructure */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Department Infrastructure
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1497366216548-37526070297c"
                  alt="Classroom"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Smart Classrooms
                  </Typography>
                  <Typography>
                    Interactive displays, video conferencing facilities,
                    and modern teaching aids.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0"
                  alt="Seminar Hall"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Seminar Halls
                  </Typography>
                  <Typography>
                    Well-equipped halls for conferences, workshops,
                    and technical presentations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                  alt="Research Center"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Research Center
                  </Typography>
                  <Typography>
                    Dedicated space for research scholars with
                    computing resources and discussion areas.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Industry Collaborations */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Industry Collaborations & MoUs
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Active Industry Partners
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li">Google - Cloud Computing Lab</Typography>
                    <Typography component="li">Microsoft - AI Research Center</Typography>
                    <Typography component="li">IBM - Quantum Computing Initiative</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Recent MoUs
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li">NVIDIA - GPU Research Lab</Typography>
                    <Typography component="li">Intel - IoT Innovation Center</Typography>
                    <Typography component="li">AWS - Cloud Excellence Center</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Facilities;