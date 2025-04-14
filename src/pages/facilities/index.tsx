import React, { useState } from "react";
import {
  Microscope,
  Library,
  Building2,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

const FacilitiesPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const facilities = [
    {
      id: 1,
      title: "Labs",
      icon: <Microscope className="w-5 h-5" />,
      description:
        "State-of-the-art Labs equipped with cutting-edge technology and modern instruments for advanced research and learning",
      details: [
        "Advanced Computing Lab with High-Performance Workstations",
        "Research Laboratory with Specialized Equipment",
        "IoT and Embedded Systems Innovation Hub",
        "Cybersecurity and Networking Lab",
      ],
      images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1719159381981-1327b22aff9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBsYWJzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      ],
      stats: {
        "Lab Area": "15,000 sq ft",
        Capacity: "200+ students",
        Equipment: "Latest Tech",
        Investment: "$2M+",
      },
    },
    {
      id: 2,
      title: "Library",
      icon: <Library className="w-5 h-5" />,
      description:
        "A comprehensive knowledge hub featuring an extensive collection of books, journals, and digital resources for academic excellence",
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
      title: "Infrastructure",
      icon: <Building2 className="w-5 h-5" />,
      description:
        "Modern infrastructure designed to foster innovation, collaboration, and academic excellence in a conducive learning environment",
      details: [
        "Smart Classrooms with Interactive Technology",
        "State-of-the-art Conference & Seminar Halls",
        "Collaborative Student Discussion Zones",
        "Advanced Research Centers",
      ],
      images: [
        "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      ],
      stats: {
        Classrooms: "25+",
        Halls: "5",
        Capacity: "1000+",
        Facilities: "15+",
      },
    },
    {
      id: 4,
      title: "Industry Ties",
      icon: <Handshake className="w-5 h-5" />,
      description:
        "Strategic partnerships with leading industry players ensuring real-world exposure and enhanced learning opportunities",
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          py: 8,
          overflow: "hidden",
          borderRadius: 3,
          mx: "auto",
          width: "95%",
          maxWidth: "1200px",
          mb: 4,
          background: "linear-gradient(135deg, #1e3a8a, #4338ca)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600)",
            opacity: 0.4,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 3,
          }}
        />
        <Box
          sx={{
            position: "relative",
            px: 4,
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: "bold",
              mb: 2,
              lineHeight: 1.2,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            World-Class Facilities
            <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(to right, #93c5fd, #c7d2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
              }}
            >
              for Future Innovators
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(10px)",
          boxShadow: 3,
          borderRadius: 3,
          mx: "auto",
          width: "95%",
          maxWidth: "1000px",
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {facilities.map((facility) => (
            <Button
              key={facility.id}
              onClick={() => setActiveTab(facility.id)}
              sx={{
                minWidth: "180px",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                color: activeTab === facility.id ? "white" : "text.secondary",
                background:
                  activeTab === facility.id
                    ? "linear-gradient(135deg,rgb(222, 240, 84),rgb(203, 177, 27))"
                    : "transparent",
                boxShadow:
                  activeTab === facility.id
                    ? "0 4px 20px rgba(59,130,246,0.3)"
                    : "none",
                "&:hover": {
                  backgroundColor:
                    activeTab === facility.id ? "primary.main" : "action.hover",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              startIcon={React.cloneElement(facility.icon, {
                color: activeTab === facility.id ? "white" : "#FFD700", // Yellow color for inactive tabs
              })}
            >
              {facility.title}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          px: 2,
          py: 2,
          maxWidth: "1200px",
          mx: "auto",
          width: "95%",
        }}
      >
        {facilities.map((facility) => (
          <Box
            key={facility.id}
            sx={{
              display: activeTab === facility.id ? "block" : "none",
              animation:
                activeTab === facility.id ? "fadeIn 0.5s ease" : "none",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                mb: 4,
              }}
            >
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  {facility.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 4,
                  }}
                >
                  {facility.description}
                </Typography>

                {/* Images Gallery */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    Gallery
                  </Typography>
                  <Grid container spacing={2}>
                    {facility.images.map((image, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Paper
                          sx={{
                            height: 220,
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
                            alt={`${facility.title} ${index + 1}`}
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
                </Box>

                {/* Key Features */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  Key Features
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {facility.details.map((detail, index) => (
                    <Grid item xs={12} sm={6} key={index}>
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
                        <Box
                          sx={{
                            color: "primary.main",
                            mr: 2,
                            flexShrink: 0,
                            display: "flex",
                          }}
                        >
                          <ChevronRight />
                        </Box>
                        <Typography variant="body2">{detail}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                {/* Stats */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary",
                  }}
                >
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
                            background:
                              "linear-gradient(to right, #f1f5f9, #ffffff)",
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
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          {value}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FacilitiesPage;
