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
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import { testimonials, recruiters, mouData } from "./api/Home";

const stats = [
  {
    icon: <WorkIcon fontSize="large" />,
    label: "Total Placements",
    value: "150+",
  },
  {
    icon: <EmojiEventsIcon fontSize="large" />,
    label: "Highest Package",
    value: "₹12 LPA",
  },
  {
    icon: <BusinessIcon fontSize="large" />,
    label: "Top Recruiters",
    value: "35+",
  },
  { icon: <SchoolIcon fontSize="large" />, label: "Internships", value: "80+" },
];

const Placements = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ py: { xs: 4, md: 6 }, minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          {/* Page Title */}
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color={theme.palette.text.primary}
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            Placements - CSD & CSIT
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: { xs: 4, md: 6 },
              color: theme.palette.text.secondary,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Bridging talent with top tech companies across the globe.
          </Typography>

          {/* Marquee Banner */}
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#e3f2fd",
              py: 1,
              fontSize: { xs: "0.9rem", md: "1.1rem" },
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

          {/* Top Placements */}
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
            Top Placements
          </Typography>
          <Grid container spacing={4} sx={{ mb: { xs: 4, md: 6 } }}>
            {testimonials.map((t, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
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
                    image={t.image}
                    alt={t.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, color: theme.palette.text.primary }}
                    >
                      {t.name} – {t.company}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      "{t.message}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
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
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      mx: "auto",
                      mb: 2,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, color: theme.palette.text.primary }}
                  >
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Top Recruiters */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Top Recruiters
          </Typography>
          <Grid container spacing={2} sx={{ mb: { xs: 4, md: 6 } }}>
            {recruiters.map((r, idx) => (
              <Grid item xs={6} sm={4} md={2} key={idx}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRadius: 3,
                    border: "2px solid #e0e0e0",
                    bgcolor: theme.palette.background.paper,
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.mode === "dark" ? "#424242" : "#e3f2fd",
                    },
                  }}
                >
                  {r}
                </Paper>
              </Grid>
            ))}
          </Grid>
             {/* MOUs */}
             <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            🤝 Industry Collaborations & MOUs
          </Typography>
          <Box
  sx={{
    py: { xs: 4, md: 6 },
    backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#F9F5ED", 
  }}
>
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
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            borderRadius: 3,
            width: "100%",
            boxShadow: 3,
          }}
        />
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {item.title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          {item.description}
        </Typography>
      </Grid>
    </Grid>
  ))}
</Box>
        </Container>
      </Box>
    </>
  );
};

export default Placements;

