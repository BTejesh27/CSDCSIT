import { Box, Container, Typography, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Academic = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Academic Calendar & Time Table
        </Typography>

        {/* Academic Calendar */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Academic Calendar 2024-25
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Fall Semester Begins</TableCell>
                <TableCell>August 1, 2024</TableCell>
                <TableCell>16 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mid-term Examinations</TableCell>
                <TableCell>September 15-30, 2024</TableCell>
                <TableCell>2 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Winter Break</TableCell>
                <TableCell>December 15-31, 2024</TableCell>
                <TableCell>2 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spring Semester Begins</TableCell>
                <TableCell>January 15, 2025</TableCell>
                <TableCell>16 weeks</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* Time Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Class Time Table
          </Typography>
          <Grid container spacing={4}>
            {/* Sample Time Table */}
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Monday</TableCell>
                    <TableCell>Tuesday</TableCell>
                    <TableCell>Wednesday</TableCell>
                    <TableCell>Thursday</TableCell>
                    <TableCell>Friday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>9:00 - 10:00</TableCell>
                    <TableCell>Data Structures</TableCell>
                    <TableCell>Algorithm Design</TableCell>
                    <TableCell>Database Systems</TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>AI Fundamentals</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10:15 - 11:15</TableCell>
                    <TableCell>Computer Networks</TableCell>
                    <TableCell>Operating Systems</TableCell>
                    <TableCell>Software Engineering</TableCell>
                    <TableCell>Machine Learning</TableCell>
                    <TableCell>Cloud Computing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11:30 - 12:30</TableCell>
                    <TableCell>Lab Session</TableCell>
                    <TableCell>Lab Session</TableCell>
                    <TableCell>Project Work</TableCell>
                    <TableCell>Lab Session</TableCell>
                    <TableCell>Project Work</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Academic;