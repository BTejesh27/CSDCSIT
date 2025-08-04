import React from 'react';
import { Mail, MapPin, Bookmark, Award, Globe, Clock, Phone } from 'lucide-react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Link, useTheme } from '@mui/material';
import { useGetFaculties } from './api/getFaculties';

interface Faculty {
  id: string;
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  researchInterests: string[];
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  website?: string;
}

function FacultyCard({ faculty, theme }: { faculty: Faculty; theme: any }) {
  return (
    <Card
      sx={{
        borderRadius: 16,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' },
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={faculty.image}
            alt={faculty.name}
            sx={{
              width: 120,
              height: 120,
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: 4,
              mr: 3,
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {faculty.name}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {faculty.role}
            </Typography>
            {faculty.website && (
              <Link href={faculty.website} target="_blank" rel="noopener" underline="hover">
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Globe style={{ width: 16, height: 16 }} /> Website
                </Typography>
              </Link>
            )}
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Award style={{ width: 20, height: 20 }} /> Qualifications
              </Typography>
              <Box sx={{ pl: 3 }}>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {faculty.qualifications.map((qual, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2" color="text.secondary">
                        {qual}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail style={{ width: 20, height: 20 }} /> Contact Information
              </Typography>
              <Box sx={{ pl: 3 }}>
                {faculty.email && (
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Mail style={{ width: 16, height: 16 }} /> {faculty.email}
                  </Typography>
                )}
                {faculty.phone && (
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone style={{ width: 16, height: 16 }} /> {faculty.phone}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <MapPin style={{ width: 16, height: 16 }} /> {faculty.office}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Clock style={{ width: 16, height: 16 }} /> {faculty.officeHours}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Bookmark style={{ width: 20, height: 20 }} /> Subjects
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pl: 3 }}>
                {faculty.researchInterests.map((interest, i) => (
                  <Chip
                    key={i}
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
}

const FacultyPage: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useGetFaculties();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Failed to load faculty data: {error.message}</Typography>;

  const facultyData = (data ?? []).map((item) => ({
    id: item._id,
    name: item.name,
    role: "Faculty",
    // Support both new base64 images and old imagePath for backward compatibility
    image: item.imageUrl || (item.imagePath?.replace(/^public\//, "/")) || "/default.jpg",
    qualifications: item.qualifications ?? [],
    researchInterests: item.subjects ?? [],
    email: item.mail ?? "",
    phone: item.number ?? "",
    office: item.location ?? "N/A",
    officeHours: "N/A",
    website: undefined,
  }));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(to bottom right, #121212, #1e1e1e)'
            : 'linear-gradient(to bottom right, #f0f4ff, #e8f0ff)',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 4 }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: 5,
            p: 4,
            borderRadius: 4,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to right, #333333, #444444)'
                : 'linear-gradient(to right, #4f46e5, #9333ea)',
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
        <Grid container spacing={4}>
          {facultyData.map((faculty) => (
            <Grid item xs={12} md={6} key={faculty.id}>
              <FacultyCard faculty={faculty} theme={theme} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FacultyPage;
