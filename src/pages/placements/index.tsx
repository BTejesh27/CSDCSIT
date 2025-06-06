import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  useTheme,
  CardMedia,
  Button,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import { recruiters, mouData } from "./api/Home";
import { useState } from "react";
import { usePlacements } from "./api/usePlacements";
import { useInternships } from "./api/useInternships";

const stats = [
  { icon: <WorkIcon fontSize="large" />, label: "Total Placements", value: "30+" },
  { icon: <EmojiEventsIcon fontSize="large" />, label: "Highest Package", value: "₹12 LPA" },
  { icon: <BusinessIcon fontSize="large" />, label: "Top Recruiters", value: "10+" },
  { icon: <SchoolIcon fontSize="large" />, label: "Internships", value: "20+" },
];

const Placements = () => {
  const theme = useTheme();

  const [placementsToShow, setPlacementsToShow] = useState(3);
  const [internsToShow, setInternsToShow] = useState(3);

  const { data: placements = [], isLoading: loadingPlacements, error: errorPlacements } = usePlacements();
  const { data: internships = [], isLoading: loadingInternships, error: errorInternships } = useInternships();

  const handleMorePlacements = () => setPlacementsToShow((prev) => prev + 3);
  const handleMoreInterns = () => setInternsToShow((prev) => prev + 3);
  const handleLessPlacements = () => setPlacementsToShow(3);
  const handleLessInterns = () => setInternsToShow(3);

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Placements - CSD & CSIT
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: { xs: 4, md: 6 }, color: theme.palette.text.secondary }}>
          Bridging talent with top tech companies across the globe.
        </Typography>
        {/*marquee */}
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#e3f2fd",
            py: 1,
            fontSize: { md: "1.1rem" },
            display: { xs: "none", md: "block" }, // ❌ Hidden on mobile
          }}
        >
          <Typography
            component="div"
            sx={{
              display: "inline-block",
              px: 2,
              animation: "marquee 15s linear infinite",
              fontWeight: "bold",
              color: theme.palette.primary.main,
              "@keyframes marquee": {
                "0%": { transform: "translateX(100%)" },
                "100%": { transform: "translateX(-100%)" },
              },
            }}
          >
            🎉 Highest Package: ₹12 LPA 🌟 80+ Internships
          </Typography>
        </Box>
        {/* Placements */}
        <Typography align="center" variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Top Placements
        </Typography>
        {loadingPlacements ? (
          <Typography align="center">Loading placements...</Typography>
        ) : errorPlacements ? (
          <Typography color="error" align="center">{errorPlacements.message}</Typography>
        ) : (
          <>
            <Grid container spacing={4} sx={{ mb: 3 }}>
              {placements.slice(0, placementsToShow).map((t, idx) => (
                <Grid item xs={12} sm={6} md={4} key={t._id || idx}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={t.imagePath?.replace(/^public\//, "/") || "/default.jpg"}
                      alt={t.studentName}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {t.studentName} – {t.company}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {t.role}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {t.description}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Package: ₹{t.package}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Year: {t.year}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {placementsToShow < placements.length ? (
              <Button onClick={handleMorePlacements} variant="outlined" sx={{ display: "block", mx: "auto", mb: 4 }}>
                Show More
              </Button>
            ) : (
              <Button onClick={handleLessPlacements} variant="outlined" sx={{ display: "block", mx: "auto", mb: 4 }}>
                Show Less
              </Button>
            )}
          </>
        )}

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  backdropFilter: "blur(8px)",
                  backgroundColor: theme.palette.background.paper,
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mx: "auto", mb: 2, width: 56, height: 56 }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Internships */}
        <Typography align="center" variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Top Internships
        </Typography>
        {loadingInternships ? (
          <Typography align="center">Loading internships...</Typography>
        ) : errorInternships ? (
          <Typography color="error" align="center">{errorInternships.message}</Typography>
        ) : (
          <>
            <Grid container spacing={4} sx={{ mb: 3 }}>
              {internships.slice(0, internsToShow).map((t, idx) => (
                <Grid item xs={12} sm={6} md={4} key={t._id || idx}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={t.imagePath?.replace(/^public\//, "/") || "/default.jpg"}
                      alt={t.studentName}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {t.studentName} – {t.company}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {t.role}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {t.description}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Stipend: ₹{t.stipend}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {internsToShow < internships.length ? (
              <Button onClick={handleMoreInterns} variant="outlined" sx={{ display: "block", mx: "auto", mb: 4 }}>
                Show More
              </Button>
            ) : (
              <Button onClick={handleLessInterns} variant="outlined" sx={{ display: "block", mx: "auto", mb: 4 }}>
                Show Less
              </Button>
            )}
          </>
        )}

        {/* Recruters*/}
     
        <Typography
          align="center"
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, md: 3 },
            color: theme.palette.text.primary,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Top Recruiters
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            overflow: "hidden",
            whiteSpace: "nowrap",
            backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#ffffff",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              animation: "marquee 30s linear infinite",
              whiteSpace: "nowrap",
              "@keyframes marquee": {
                "0%": { transform: "translateX(100%)" },
                "100%": { transform: "translateX(-100%)" },
              },
            }}
          >
            {recruiters.map((recruiter, idx) => (
              <Box
                key={idx}
                component="img"
                src={recruiter}
                alt={`Recruiter ${idx}`}
                sx={{
                  height: 60,
                  width: "auto",
                  mx: 3,
                  display: "inline-block",
                  objectFit: "contain",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Mobile: Horizontal Scroll */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            overflowX: "auto",
            whiteSpace: "nowrap",
            py: 2,
            px: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {recruiters.map((recruiter, idx) => (
            <Box
              key={idx}
              component="img"
              src={recruiter}
              alt={`Recruiter ${idx}`}
              sx={{
                height: 50, // Fixed height for mobile

                mr: 2,
                flexShrink: 0, // Prevent shrinking
                objectFit: "contain", // Maintain aspect ratio and avoid cropping
              }}
            />
          ))}
        </Box>


        {/* MOUs */}
        <Typography align="center" variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          🤝 Industry Collaborations & MOUs
        </Typography>
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#F9F5ED" }}>
          {mouData.map((item, index) => (
            <Grid
              container
              spacing={4}
              alignItems="center"
              key={index}
              sx={{
                mb: { xs: 4, md: 6 },
                flexDirection: { xs: "column", md: "row" },
                px: { xs: 2, md: 6 },
              }}
            >
              <Grid item xs={12} md={5}>
                <CardMedia component="img" image={item.image} alt={item.title} sx={{ borderRadius: 3, width: "100%", boxShadow: 3 }} />
              </Grid>
              <Box
                sx={{
                  width: "6px",
                  height: "100%",
                  backgroundColor: "#6a1b9a",
                  mx: 3,
                  display: { xs: "none", md: "block" },
                }}
              />
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Placements;
