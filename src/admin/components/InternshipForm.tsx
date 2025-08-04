import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useInternships } from "../../pages/placements/api/useInternships";

export function InternshipForm() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || "";
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    year: "",
    stipend: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch internships
  const { data: internships, refetch, isLoading } = useInternships();

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

      const payload: any = {
        ...form,
        year: form.year ? Number(form.year) : undefined,
        stipend: form.stipend ? Number(form.stipend) : undefined,
      };
      if (selectedImage && imageData) {
        payload.image = imageData;
        payload.imageName = selectedImage.name;
      }


      let url = `${BACKEND_URL}/internships`;
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `${BACKEND_URL}/internships/${editId}`;
        method = "PUT";
      }

      const internshipRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const internshipResult = await internshipRes.text();

      if (internshipRes.ok) {
        setMessage(`✅ ${internshipResult}`);
        setForm({
          studentName: "",
          company: "",
          role: "",
          year: "",
          stipend: "",
          description: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${internshipResult || 'Failed to save internship'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit internship: populate form
  const handleEdit = (internship: any) => {
    setForm({
      studentName: internship.studentName || "",
      company: internship.company || "",
      role: internship.role || "",
      year: internship.year ? internship.year.toString() : "",
      stipend: internship.stipend ? internship.stipend.toString() : "",
      description: internship.description || "",
    });
    setEditId(internship._id);
    setSelectedImage(null);
    setImagePreview(internship.imageUrl || null);
    setMessage(null);
  };

  // Delete internship: open confirm dialog
  const handleDelete = (internship: any) => {
    setDeleteId(internship._id);
    setDeleteName(internship.studentName);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/internships/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete internship'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while deleting the internship");
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
      studentName: "",
      company: "",
      role: "",
      year: "",
      stipend: "",
      description: "",
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
          <Typography variant="h6" mb={1}>{editId ? "Edit Internship" : "Add Internship"}</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField 
            label="Student Name" 
            name="studentName" 
            value={form.studentName} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Company" 
            name="company" 
            value={form.company} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Role" 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Year" 
            name="year" 
            value={form.year} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Stipend" 
            name="stipend" 
            value={form.stipend} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Description" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            required 
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
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit Internship')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* Internships List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Internships</Typography>
          {isLoading ? (
            <Typography>Loading internships...</Typography>
          ) : (
            <Grid container spacing={2}>
              {internships && internships.length > 0 ? internships.map((internship: any) => (
                <Grid item xs={12} key={internship._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    {internship.imageUrl && (
                      <Box component="img" src={internship.imageUrl} alt={internship.studentName} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #eee' }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{internship.studentName}</Typography>
                      <Typography variant="body2" color="text.secondary">{internship.company} | {internship.role}</Typography>
                      <Typography variant="body2" color="text.secondary">Year: {internship.year} | Stipend: {internship.stipend}</Typography>
                      <Typography variant="caption" color="text.secondary">{internship.description}</Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(internship)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(internship)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No internships found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Internship</DialogTitle>
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