import {
 
  Laptop,
  Library,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const facilities = [
  {
    id: 1,
    title: "Labs",
    icon: <Laptop className="w-5 h-5" />,
    description:
      "State-of-the-art Labs equipped with cutting-edge technology and modern instruments for advanced research and learning.",
    details: [
      "Equipped with high-performance workstations running Ubuntu (open-source) OS, this lab offers a developer-friendly environment for software innovation and experimentation.",
      "🔹 Open after-hours: Available for student projects and research from 5 PM to 8 PM on working days.",
      "🔹 Promotes a collaborative ecosystem where students and faculty work on real-world problems.",
      "🔹 Flexible usage hours allow project work beyond class schedules, especially in the evenings.",
    ],
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1719159381981-1327b22aff9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBsYWJzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    stats: {
      TotalLabs: "3 Labs",
      Capacity: "250+ students",
      Equipment: "Latest Tech",
      Investment: "$2M+",
    },
  },
  {
    id: 2,
    title: "Library",
    icon: <Library className="w-5 h-5" />,
    description:
      "A comprehensive knowledge hub featuring an extensive collection of books, journals, and digital resources for academic excellence.",
    details: [
      "24/7 Digital Library with Global Database Access",
      "International Journal & Research Paper Repository",
      "Interactive E-Learning Platform Access",
      "Technical Magazine & Publication Archive",
    ],
    images: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    stats: {
      Books: "50,000+",
      Journals: "200+",
      Databases: "50+",
      Seating: "300+",
    },
  },
  {
    id: 3,
    title: "Industry Ties",
    icon: <Handshake className="w-5 h-5" />,
    description:
      "Strategic partnerships with leading industry players ensuring real-world exposure and enhanced learning opportunities.",
    details: [
      "Industry-sponsored Research Projects",
      "Comprehensive Internship Programs",
      "Expert Lecture Series & Workshops",
      "Research & Development Collaborations",
    ],
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
    stats: {
      Partners: "50+",
      Projects: "100+",
      Internships: "200+",
      Workshops: "24/year",
    },
  },
];

const FacilitySection = ({ facility }: { facility: typeof facilities[0] }) => (
  <Paper
    elevation={3}
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      border: "1px solid",
      borderColor: "divider",
      mb: 6,
      p: { xs: 2, sm: 4 },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ mr: 2 }}>{facility.icon}</Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
        {facility.title}
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
      {facility.description}
    </Typography>
    {/* Images Gallery */}
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {facility.images.map((image, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <Paper
            sx={{
              height: 180,
              overflow: "hidden",
              borderRadius: 2,
              position: "relative",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`${facility.title} ${idx + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
    {/* Key Features */}
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
      Key Features
    </Typography>
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {facility.details.map((detail, idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.3s ease",
              height: "100%",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box sx={{ color: "primary.main", mr: 2, flexShrink: 0, display: "flex" }}>
              <ChevronRight />
            </Box>
            <Typography variant="body2">{detail}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    {/* Stats */}
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
      Quick Stats
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(facility.stats).map(([key, value]) => (
        <Grid item xs={6} sm={3} key={key}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: 2,
              height: "100%",
              transition: "all 0.3s ease",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 4,
                background: "linear-gradient(to right, #f1f5f9, #ffffff)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                mb: 1,
              }}
            >
              {key}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
              {value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const FacilitiesPage = () => (
  <Box sx={{ minHeight: "100vh", px: 2, py: 4, maxWidth: "1200px", mx: "auto", width: "95%" }}>
    <FacilitySection facility={facilities[0]} />
    <FacilitySection facility={facilities[1]} />
    <FacilitySection facility={facilities[2]} />
  </Box>
);

export default FacilitiesPage;