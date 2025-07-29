import { Box, List, ListItemButton, ListItemText } from "@mui/material";

type ViewType = "faculty" | "placements" | "internships" | "events" | "news" | "syllabus";
interface AdminSidebarProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

const items: { key: ViewType; label: string }[] = [
  { key: "faculty", label: "Faculty" },
  { key: "placements", label: "Placements" },
  { key: "internships", label: "Internships" },
  { key: "events", label: "Events" },
  { key: "news", label: "News" },
  { key: "syllabus", label: "Syllabus" },
];

export default function AdminSidebar({ view, setView }: AdminSidebarProps) {
  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
        backgroundColor: "background.paper",
        pt: 4,
      }}
    >
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.key}
            selected={view === item.key}
            onClick={() => setView(item.key)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
