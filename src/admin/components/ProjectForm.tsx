import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

// You need to implement this hook similar to useEvents
import { useProjects } from "../../pages/projects/api/useProjects";

export function ProjectForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    link: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch projects
  const { data: projects, refetch, isLoading } = useProjects();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit for add/edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsUploading(true);

    try {
      const payload = {
        ...form,
        year: Number(form.year),
      };

      let url = "http://localhost:3000/projects";
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `http://localhost:3000/projects/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.text();

      if (res.ok) {
        setMessage(`✅ ${result}`);
        setForm({ title: "", description: "", year: "", link: "" });
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to save project'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
    } finally {
      setIsUploading(false);
    }
  };

  // Edit project: populate form
  const handleEdit = (project: any) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      year: project.year ? String(project.year) : "",
      link: project.link || "",
    });
    setEditId(project._id);
    setMessage(null);
  };

  // Delete project: open confirm dialog
  const handleDelete = (project: any) => {
    setDeleteId(project._id);
    setDeleteName(project.title);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/projects/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete project'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while deleting the project");
    } finally {
      setIsUploading(false);
      setConfirmOpen(false);
      setDeleteId(null);
      setDeleteName("");
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
    setDeleteName("");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", year: "", link: "" });
    setEditId(null);
    setMessage(null);
  };

  return (
    <Grid container spacing={4} alignItems="flex-start">
      {/* Form Left */}
      <Grid item xs={12} md={5}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: '#fff' }}>
          <Typography variant="h6" mb={1}>{editId ? "Edit Project" : "Add Project"}</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField 
            label="Project Title" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Description" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            multiline
            rows={4}
            required 
          />
          <TextField 
            label="Year" 
            name="year" 
            type="number"
            value={form.year} 
            onChange={handleChange} 
            required 
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
          />
          <TextField 
            label="Project Link" 
            name="link" 
            value={form.link} 
            onChange={handleChange} 
            type="url"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isUploading}
            >
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit Project')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* Projects List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Projects</Typography>
          {isLoading ? (
            <Typography>Loading projects...</Typography>
          ) : (
            <Grid container spacing={2}>
              {projects && projects.length > 0 ? projects.map((project: any) => (
                <Grid item xs={12} key={project._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{project.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{project.description}</Typography>
                      <Typography variant="caption" color="text.secondary">{project.year} {project.link && <>| <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></>}</Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(project)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(project)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No projects found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete <b>{deleteName}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}