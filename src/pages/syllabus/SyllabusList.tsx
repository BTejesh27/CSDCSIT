import { useGetSyllabi } from "./getSyllabi";
import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Skeleton,
  alpha,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
  Business as DepartmentIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const BRANCHES = ["CSD", "CSIT"];
const YEARS = [1, 2, 3, 4];

// Styled components for 3D effects
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.05)})`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: '16px',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(145deg, transparent, ${alpha(theme.palette.primary.main, 0.1)})`,
    borderRadius: '16px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 0,
  },
  
  '&:hover': {
    transform: 'translateY(-12px) rotateX(5deg) rotateY(5deg)',
    boxShadow: `
      0 25px 50px -12px ${alpha(theme.palette.primary.main, 0.25)},
      0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)},
      inset 0 1px 0 ${alpha('#ffffff', 0.1)}
    `,
    
    '&::before': {
      opacity: 1,
    },
  },
  
  '&:active': {
    transform: 'translateY(-8px) rotateX(2deg) rotateY(2deg)',
  },
}));

const FilterContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.03)})`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: '20px',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const PDFPreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  overflow: 'hidden',
  background: `linear-gradient(145deg, ${alpha(theme.palette.grey[100], 0.5)}, ${alpha(theme.palette.grey[200], 0.3)})`,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  
  '& iframe': {
    width: '100%',
    height: '100%',
    border: 'none',
    pointerEvents: 'none',
    transition: 'transform 0.3s ease',
  },
  
  '&:hover iframe': {
    transform: 'scale(1.05)',
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: '2px',
  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.1)})`,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

// Loading Card Component
const LoadingCard = () => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.05)})`,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
          animation: 'shimmer 2s infinite',
        },
        
        '@keyframes shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ borderRadius: '12px', mb: 2 }}
        />
        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={70} height={24} />
        </Box>
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Skeleton variant="rounded" width={100} height={36} />
        <Skeleton variant="rounded" width={80} height={36} />
      </CardActions>
    </Card>
  );
};

const SyllabusList = () => {
  const { data: syllabi, isLoading, error } = useGetSyllabi();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Get unique subjects based on selected year and branch
  const subjects = useMemo(() => {
    if (!syllabi) return [];
    return Array.from(
      new Set(
        syllabi
          .filter(s =>
            (!selectedYear || s.year === Number(selectedYear)) &&
            (!selectedBranch || s.branch === selectedBranch)
          )
          .map(s => s.subject)
      )
    );
  }, [syllabi, selectedYear, selectedBranch]);

  // Filter syllabi based on selections
  const filteredSyllabi = useMemo(() => {
    if (!syllabi) return [];
    return syllabi.filter(s =>
      (!selectedYear || s.year === Number(selectedYear)) &&
      (!selectedBranch || s.branch === selectedBranch) &&
      (!selectedSubject || s.subject === selectedSubject)
    );
  }, [syllabi, selectedYear, selectedBranch, selectedSubject]);

  const theme = useTheme();

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography 
          color="error" 
          variant="h6"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Error loading syllabi
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default, 
      minHeight: '100vh', 
      py: 4,
      px: 2,
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Get Syllabus 
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Browse and download comprehensive course syllabi for all Branches
        </Typography>
      </Box>

      {/* Filter Section */}
      <FilterContainer elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <FilterIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography 
            variant="h5" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            Filter Syllabi
          </Typography>
        </Box>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Branch</InputLabel>
              <Select
                value={selectedBranch}
                label="Branch"
                onChange={e => { setSelectedBranch(e.target.value); setSelectedSubject(""); }}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <MenuItem value="">All Branches</MenuItem>
                {BRANCHES.map(branch => (
                  <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={e => { setSelectedYear(e.target.value); setSelectedSubject(""); }}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <MenuItem value="">All Years</MenuItem>
                {YEARS.map(year => (
                  <MenuItem key={year} value={year}>Year {year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={4}>
            <FormControl 
              fullWidth 
              variant="outlined" 
              disabled={subjects.length === 0}
            >
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject}
                label="Subject"
                onChange={e => setSelectedSubject(e.target.value)}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <MenuItem value="">All Subjects</MenuItem>
                {subjects.map(subject => (
                  <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </FilterContainer>

      {/* Results Section */}
      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <LoadingCard />
            </Grid>
          ))}
        </Grid>
      ) : filteredSyllabi.length === 0 ? (
        <Fade in={!isLoading}>
          <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
            <SchoolIcon 
              sx={{ 
                fontSize: 80, 
                color: theme.palette.grey[400], 
                mb: 2 
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 1,
              }}
            >
              No syllabi found for selected filters
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
            >
              Try adjusting your search criteria
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={3}>
          {filteredSyllabi.map((syllabus, index) => (
            <Grid item xs={12} sm={6} md={4} key={syllabus._id}>
              <Zoom 
                in={!isLoading} 
                timeout={300 + index * 100}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <StyledCard>
                  <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                    {/* PDF Preview */}
                    <PDFPreviewContainer>
                      <Box
                        component="a"
                        href={`http://localhost:3000/${syllabus.filePath.replace(/\\/g, '/')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          textDecoration: 'none',
                        }}
                      >
                        <iframe
                          src={`http://localhost:3000/${syllabus.filePath.replace(/\\/g, '/')}`}
                          title={syllabus.subject}
                        />
                      </Box>
                    </PDFPreviewContainer>

                    {/* Subject Title */}
                    <Typography 
                      variant="h6" 
                      component="h2"
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {syllabus.subject}
                    </Typography>

                    {/* Info Chips */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <InfoChip
                        icon={<CalendarIcon sx={{ fontSize: '16px' }} />}
                        label={`Year ${syllabus.year}`}
                        size="small"
                      />
                      <InfoChip
                        icon={<CategoryIcon sx={{ fontSize: '16px' }} />}
                        label={syllabus.branch}
                        size="small"
                      />
                      <InfoChip
                        icon={<ScheduleIcon sx={{ fontSize: '16px' }} />}
                        label={`Unit ${syllabus.unit}`}
                        size="small"
                      />
                    </Box>

                    {/* Additional Info */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <DepartmentIcon sx={{ fontSize: '16px', mr: 1, verticalAlign: 'middle' }} />
                        <strong>Department:</strong> {syllabus.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Uploaded:</strong> {new Date(syllabus.uploadedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      startIcon={<ViewIcon />}
                      href={`http://localhost:3000/${syllabus.filePath.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      View
                    </Button>
                    
                
                  </CardActions>
                </StyledCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SyllabusList;