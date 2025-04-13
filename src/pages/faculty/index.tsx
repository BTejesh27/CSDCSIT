import React, { memo } from 'react';
import { Mail, MapPin, Bookmark, Award, Globe, Clock } from 'lucide-react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Link, useTheme } from '@mui/material';

interface Faculty {
  id: number;
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  researchInterests: string[];
  email: string;
  office: string;
  officeHours: string;
  website?: string;
}

const facultyData: Faculty[] = [
  {
    id: 1,
    name: "Surya",
    role: "Assistant Professor & M.Tech",
    image: "src/assests/images/bhargavi.jpg",
    qualifications: ["M.Tech"],
    researchInterests: ["HCI", "HCI Lab"],
    email: "8985352449",
    office: "N/A",
    officeHours: "N/A",
    website: undefined
  },
  {
    id: 2,
    name: "Sindhuri Suseela Mantena",
    role: "Assistant Professor & M.Tech (PhD)",
    image: "src/assests/images/bhargavi.jpg",
    qualifications: ["M.Tech", "PhD (Pursuing)"],
    researchInterests: ["Machine Learning", "C","Deep Learning", "Java",  "Data Structures","DLD", "Computer Organization"],
    email: "mss@srkrec.ac.in",
    office: "N/A",
    officeHours: "N/A",
    website: undefined
  },
  {
    id: 3,
    name: "Pericherla Manoj",
    role: "M.Tech",
    image: "src/assests/images/bhargavi.jpg",
    qualifications: ["M.Tech"],
    researchInterests: ["Computer Science Engineering"],
    email: "7036256222",
    office: "N/A",
    officeHours: "N/A",
    website: undefined
  },

  {
    id: 4,
    name: "Mr. Praveen Kumar",
    role: "Associate Professor",
    image: "src/assests/images/d.jpg"  ,
    qualifications: [
      "Ph.D. in Database Systems",
      "M.Tech in Information Systems",
    ],
    researchInterests: ["Database Systems", "Big Data", "Data Analytics"],
    email: "praveenkumar@srkrec.edu.in",
    office: "Information Technology Department",
    officeHours: "N/A",
    website: undefined
  },
  {
    id: 5,
    name: "Mr. Mohan Krishna",
    role: "Associate Professor",
    image: "src/pages/faculty/img/e.jpg",
    qualifications: [
      "Ph.D. in Computer Science",
      "M.Tech in Computer Networks",
      "B.Tech in Computer Science"
    ],
    researchInterests: ["Operating System", "Network Security", "Computer Networks"],
    email: "mohan.krishna@srkrec.edu.in",
    office: "Computer Science & Design Department",
    officeHours: "N/A",
    website: undefined
  },
  {
    id: 6,
    name: "Mr. Sunil",
    role: "Professor",
    image: "src/pages/faculty/img/f.jpg",
    qualifications: [
      "Ph.D. in Database Systems",
      "M.Tech in Computer Science",
      "B.Tech in Computer Science"
    ],
    researchInterests: ["Database Systems", "Data Analytics", "Data Mining"],
    email: "sunil@srkrec.edu.in",
    office: "Computer Science & Design Department",
    officeHours: "N/A",
    website: undefined
  }
];

// Reusable FacultyCard Component
const FacultyCard = memo(({ faculty }: { faculty: Faculty }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 16,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' },
        background: 'linear-gradient(to bottom, #ffffff, #f9f9ff)',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={faculty.image}
            alt={`${faculty.name}'s photo`}
            sx={{
              width: 120,
              height: 120,
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: 4,
              mr: 3,
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              {faculty.name}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {faculty.role}
            </Typography>
            {faculty.website && (
              <Link href={faculty.website} target="_blank" rel="noopener" underline="hover">
                <Typography variant="body2" color="text.secondary">
                  <Globe style={{ width: 16, height: 16, marginRight: 4 }} />
                  Website
                </Typography>
              </Link>
            )}
          </Box>
        </Box>

        {/* Content Grid */}
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            {/* Qualifications */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Award style={{ width: 20, height: 20 }} />
                Qualifications
              </Typography>
              <Box sx={{ pl: 3 }}>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {faculty.qualifications.map((qual, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2" color="text.secondary">
                        {qual}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>

            {/* Contact Information */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Mail style={{ width: 20, height: 20 }} />
                Contact Information
              </Typography>
              <Box sx={{ pl: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <Mail style={{ width: 16, height: 16 }} />
                  {faculty.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <MapPin style={{ width: 16, height: 16 }} />
                  {faculty.office}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Clock style={{ width: 16, height: 16 }} />
                  {faculty.officeHours}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={6}>
            {/* Research Interests */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Bookmark style={{ width: 20, height: 20 }} />
Subjects               </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pl: 3 }}>
                {faculty.researchInterests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    sx={{
                      background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

const FacultyPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f4ff, #e8f0ff)' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 5,
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
            color: 'white',
            boxShadow: 6,
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Meet Our Distinguished Faculty
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Pioneering the future of computer science through groundbreaking research and exceptional education.
          </Typography>
        </Box>

        {/* Faculty Grid */}
        <Grid container spacing={4}>
          {facultyData.map((faculty) => (
            <Grid item xs={12} md={6} key={faculty.id}>
              <FacultyCard faculty={faculty} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FacultyPage;