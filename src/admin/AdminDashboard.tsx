import { useState } from "react";
import FacultyForm from "./components/FacultyForm";
import PlacementForm from "./components/PlacementForm";
import { InternshipForm } from "./components/InternshipForm";
import { EventForm } from "./components/EventForm";
import { NewsForm } from "./components/NewsForm";
import { Button, Box, Typography, Container } from "@mui/material";

export default function AdminDashboard() {
  const [view, setView] = useState<
    "faculty" | "placements" | "internships" | "events" | "news"
  >("faculty");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant={view === "faculty" ? "contained" : "outlined"}
          onClick={() => setView("faculty")}
        >
          Faculty
        </Button>
        <Button
          variant={view === "placements" ? "contained" : "outlined"}
          onClick={() => setView("placements")}
        >
          Placements
        </Button>
        <Button
          variant={view === "internships" ? "contained" : "outlined"}
          onClick={() => setView("internships")}
        >
          Internships
        </Button>
        <Button
          variant={view === "events" ? "contained" : "outlined"}
          onClick={() => setView("events")}
        >
          Events
        </Button>
        <Button
          variant={view === "news" ? "contained" : "outlined"}
          onClick={() => setView("news")}
        >
          News
        </Button>
      </Box>

      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        {view === "faculty" && <FacultyForm />}
        {view === "placements" && <PlacementForm />}
        {view === "internships" && <InternshipForm />}
        {view === "events" && <EventForm />}
        {view === "news" && <NewsForm />}
      </Box>
    </Container>
  );
}
