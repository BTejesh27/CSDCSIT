import { useState } from "react";
import FacultyForm from "./components/FacultyForm";
import { PlacementForm } from "./components/PlacementForm";
import { InternshipForm } from "./components/InternshipForm";
import { EventForm } from "./components/EventForm";
import { NewsForm } from "./components/NewsForm";
import SyllabusForm from "./components/SyllabusForm";
import { Box, Typography, Container } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { ProjectForm } from "./components/ProjectForm";
import { StartupForm } from "./components/StartupForm";

export default function AdminDashboard() {
  const [view, setView] = useState<
    "faculty" | "placements" | "internships" | "events" | "news" | "syllabus" | "projects" | "startups"
  >("faculty");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar view={view} setView={setView} />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
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
          {view === "syllabus" && <SyllabusForm />}
          {view === "projects" && <ProjectForm />}
          {view === "startups" && <StartupForm />}
        </Box>
      </Container>
    </Box>
  );
}
