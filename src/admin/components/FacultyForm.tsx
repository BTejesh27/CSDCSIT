import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useGetFaculties } from "../../pages/faculty/api/getFaculties";

export default function FacultyForm() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
  const [form, setForm] = useState({
    name: "",
    mail: "",
    number: "",
    location: "",
    qualifications: "",
    subjects: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch faculties
  const { data: faculties, refetch, isLoading } = useGetFaculties();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsUploading(true);

    try {
      let imageData = "";
      if (selectedImage) {
        const reader = new FileReader();
        imageData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read image file"));
          reader.readAsDataURL(selectedImage);
        });
      }

      const payload = {
        ...form,
        qualifications: form.qualifications.split(",").map(q => q.trim()).filter(q => q),
        subjects: form.subjects.split(",").map(s => s.trim()).filter(s => s),
        image: imageData,
        imageName: selectedImage ? selectedImage.name : "",
      };

      let url = `${BACKEND_URL}/faculty`;
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `${BACKEND_URL}/faculty/${editId}`;
        method = "PUT";
      }

      const facultyRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const facultyResult = await facultyRes.text();

      if (facultyRes.ok) {
        setMessage(`✅ ${facultyResult}`);
        setForm({
          name: "",
          mail: "",
          number: "",
          location: "",
          qualifications: "",
          subjects: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${facultyResult || 'Failed to save faculty'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit faculty: populate form
  const handleEdit = (faculty: any) => {
    setForm({
      name: faculty.name || "",
      mail: faculty.mail || "",
      number: faculty.number || "",
      location: faculty.location || "",
      qualifications: (faculty.qualifications || []).join(", "),
      subjects: (faculty.subjects || []).join(", "),
    });
    setEditId(faculty._id);
    setSelectedImage(null);
    setImagePreview(faculty.imageUrl || faculty.imagePath || null);
    setMessage(null);
  };

  // Delete faculty: open confirm dialog
  const handleDelete = (faculty: any) => {
    setDeleteId(faculty._id);
    setDeleteName(faculty.name);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/faculty/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete faculty'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while deleting the faculty");
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
    setForm({
      name: "",
      mail: "",
      number: "",
      location: "",
      qualifications: "",
      subjects: "",
    });
    setEditId(null);
    setSelectedImage(null);
    setImagePreview(null);
    setMessage(null);
  };

  return (
    <Grid container spacing={4} alignItems="flex-start">
      {/* Form Left */}
      <Grid item xs={12} md={5}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: '#fff' }}>
          <Typography variant="h6" mb={1}>{editId ? "Edit Faculty" : "Add Faculty"}</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField 
            label="Name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Mail" 
            name="mail" 
            value={form.mail} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Number" 
            name="number" 
            value={form.number} 
            onChange={handleChange} 
          />
          <TextField 
            label="Location" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
          />
          <TextField 
            label="Qualifications (comma separated)" 
            name="qualifications" 
            value={form.qualifications} 
            onChange={handleChange} 
          />
          <TextField 
            label="Subjects (comma separated)" 
            name="subjects" 
            value={form.subjects} 
            onChange={handleChange} 
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ alignSelf: 'flex-start' }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {selectedImage && (
              <Box sx={{ mt: 1 }}>
                <Box 
                  component="p" 
                  sx={{ margin: '8px 0', fontSize: '14px', color: '#666' }}
                >
                  Selected: {selectedImage.name}
                </Box>
              </Box>
            )}
            {imagePreview && (
              <Box sx={{ mt: 1 }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isUploading}
            >
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit Faculty')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* Faculties List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Faculties</Typography>
          {isLoading ? (
            <Typography>Loading faculties...</Typography>
          ) : (
            <Grid container spacing={2}>
              {faculties && faculties.length > 0 ? faculties.map((faculty: any) => (
                <Grid item xs={12} key={faculty._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    {(faculty.imageUrl || faculty.imagePath) && (
                      <Box component="img" src={faculty.imageUrl || faculty.imagePath} alt={faculty.name} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #eee' }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{faculty.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{faculty.mail}</Typography>
                      <Typography variant="body2" color="text.secondary">{faculty.location}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qualifications: {(faculty.qualifications || []).join(', ')}<br/>
                        Subjects: {(faculty.subjects || []).join(', ')}
                      </Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(faculty)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(faculty)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No faculties found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Faculty</DialogTitle>
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