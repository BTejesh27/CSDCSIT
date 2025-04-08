import { Box, Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const Research = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Research & Development
        </Typography>

        {/* Research Areas */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Research Areas
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Artificial Intelligence
                  </Typography>
                  <Typography>
                    Machine Learning, Deep Learning, Computer Vision, Natural Language Processing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Cloud Computing
                  </Typography>
                  <Typography>
                    Distributed Systems, Edge Computing, Cloud Security, Virtualization
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Cybersecurity
                  </Typography>
                  <Typography>
                    Network Security, Cryptography, Blockchain, Security Protocols
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Projects & Grants */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Projects & Grants
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Smart City Development Project</strong><br />
              Funded by: Government Research Grant<br />
              Amount: $500,000<br />
              Duration: 2024-2026
            </Typography>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>AI in Healthcare</strong><br />
              Funded by: Industry Collaboration<br />
              Amount: $300,000<br />
              Duration: 2023-2025
            </Typography>
          </Box>
        </Paper>

        {/* Publications */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Recent Publications
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>
              "Advanced Deep Learning Techniques for Medical Image Analysis" - Nature Computing, 2024
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              "Blockchain-based Security Framework for IoT Devices" - IEEE Security & Privacy, 2024
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              "Cloud-Edge Hybrid Computing: A New Paradigm" - ACM Cloud Computing, 2023
            </Typography>
          </Box>
        </Paper>

        {/* Collaborations */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Research Collaborations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Academic Partners
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li">MIT, USA</Typography>
                    <Typography component="li">University of Tokyo, Japan</Typography>
                    <Typography component="li">ETH Zurich, Switzerland</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Industry Partners
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li">Google Research</Typography>
                    <Typography component="li">Microsoft Research</Typography>
                    <Typography component="li">IBM Research Labs</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Patents */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Patents
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Smart Traffic Management System</strong><br />
              Patent No: US123456789<br />
              Filed: 2024
            </Typography>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>AI-based Medical Diagnosis System</strong><br />
              Patent No: US987654321<br />
              Filed: 2023
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Research;