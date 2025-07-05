import { useState } from "react";
import FacultyForm from "./components/FacultyForm";
import PlacementForm from "./components/PlacementForm";
import { InternshipForm } from "./components/InternshipForm";
import { Button, Box } from "@mui/material";

export default function AdminDashboard() {
  const [view, setView] = useState<"faculty" | "placements" | "internships">(
    "faculty"
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button onClick={() => setView("faculty")}>Faculty</Button>
        <Button onClick={() => setView("placements")}>Placements</Button>
        <Button onClick={() => setView("internships")}>Internships</Button>
      </Box>
      {view === "faculty" && <FacultyForm />}
      {view === "placements" && <PlacementForm />}
      {view === "internships" && <InternshipForm />}
    </Box>
  );
}
