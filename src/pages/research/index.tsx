import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

const projects = [
  {
    title: 'SRKR College Website',
    description: 'The official website for SRKR Engineering College showcasing academic programs, campus facilities, and student achievements.',
    image: 'src/pages/research/images/srkr.png',
    link: 'https://srkrec.edu.in/',
  },
  {
    title: 'SVCET College Website',
    description: 'A modern web portal for SVCET College providing, information about projects, admissions, and campus activities.',
    image: 'src/pages/research/images/svct.png',
    link: 'http://svcet.net/new/',
  },
  {
    title: 'MagicalDB',
    description: 'A specialized database solution developed for Hyderabad Central University to manage research data efficiently.',
    image: 'src/pages/research/images/magicaldb.png',
    link: 'http://www.manjarilab.com/manjari/databases/magicaldb/',
  },
  {
    title: 'Bhimavaram Tennis',
    description: 'A comprehensive platform for managing local tennis tournaments, player profiles, and event scheduling.',
    image: 'src/pages/research/images/bo.png',
    link: 'https://www.bhimavaramtennis.com/',
  },
  {
    title: 'Courseware',
    description: 'An interactive learning management system designed to enhance the educational experience for computer science students.',
    image: 'src/pages/research/images/csd.png',
    link: 'https://csd27.ct.ws/CSD/',
  },
  {
    title: 'Spellbee',
    description: 'A gamified platform for conducting spell bee competitions, featuring multiple difficulty levels and real-time scoring.',
    image: 'src/pages/research/images/spell.png',
    link: 'https://srkrec.edu.in/spellbee2k24/',
  },
];

const startups = [
  {
    title: 'Campus Online',
    description: 'A specialized database solution developed for Hyderabad Central University to manage research data efficiently.',
    image: 'src/pages/research/images/co.png',
    link: 'https://campusonline.mini.store/',
  },
  {
    title: 'Bhimavaram Online',
    description: 'A comprehensive platform for managing local tennis tournaments, player profiles, and event scheduling.',
    image: 'src/pages/research/images/bonline.png',
    link: 'https://bhimavaram.online/',
  },
  {
    title: 'Bhimavaram Digitals',
    description: 'The official website for SRKR Engineering College showcasing academic programs, campus facilities, and student achievements.',
    image: 'src/pages/research/images/bd.png',
    link: 'https://www.bhimavaramdigitals.com/',
  },
];

// Custom underline style for section headings
const HeadingUnderline = () => (
  <Box
    sx={{
      width: '100px',
      height: '5px',
      background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
      margin: '12px auto 40px',
      borderRadius: '3px',
    }}
  />
);

const Section = ({ title, items }) => (
  <Box sx={{ py: 12, backgroundColor: title.includes('Startups') ? '#f4f6f8' : '#ffffff' }}>
    <Container maxWidth="lg">
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
            background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {title}
        </Typography>
        <HeadingUnderline />
      </Box>
      
      <Grid container spacing={5}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                }
              }}
            >
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <CardMedia 
                  component="img" 
                  image={item.image} 
                  alt={item.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Changed from 'cover' to 'contain'
                    backgroundColor: '#f4f4f4', // Optional: Add a background color for better contrast
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: '#1a237e',
                    mb: 2,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 4, pt: 0, textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  href={item.link} 
                  target="_blank"
                  sx={{
                    background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '30px',
                    padding: '12px 30px',
                    textTransform: 'none',
                    boxShadow: '0 6px 20px rgba(63, 81, 181, 0.4)',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(63, 81, 181, 0.6)',
                    }
                  }}
                >
                  Explore Project
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

function App() {
  return (
    <>
      <Section title="Innovative Projects" items={projects} />
      <Section title="Innovative Startups" items={startups} />
    </>
  );
}

export default App;