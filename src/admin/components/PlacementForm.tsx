import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

import { usePlacements } from "../../pages/placements/api/usePlacements";

interface Placement {
  _id: string;
  studentName: string;
  company: string;
  role: string;
  year: number | string;
  package: number | string;
  description?: string;
  imageUrl?: string;
  imageName?: string;
}

export function PlacementForm() {
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    year: "",
    package: "",
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

  // Fetch placements
  const { data: placements, refetch, isLoading } = usePlacements();

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

      // Build payload
      const payload: any = {
        ...form,
        year: Number(form.year),
        package: Number(form.package),
      };
      if (selectedImage && imageData) {
        payload.imageUrl = imageData;
        payload.imageName = selectedImage.name;
      }

      let url = "http://localhost:3000/placements";
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `http://localhost:3000/placements/${editId}`;
        method = "PUT";
      }

      const placementRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const placementResult = await placementRes.text();

      if (placementRes.ok) {
        setMessage(`✅ ${placementResult}`);
        setForm({
          studentName: "",
          company: "",
          role: "",
          year: "",
          package: "",
          description: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${placementResult || 'Failed to save placement'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit placement: populate form
  const handleEdit = (placement: Placement) => {
    setForm({
      studentName: placement.studentName || "",
      company: placement.company || "",
      role: placement.role || "",
      year: placement.year ? placement.year.toString() : "",
      package: placement.package ? placement.package.toString() : "",
      description: placement.description || "",
    });
    setEditId(placement._id);
    setSelectedImage(null);
    setImagePreview(placement.imageUrl || null);
    setMessage(null);
  };

  // Delete placement: open confirm dialog
  const handleDelete = (placement: Placement) => {
    setDeleteId(placement._id);
    setDeleteName(placement.studentName);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/placements/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete placement'}`);
      }
    } catch {
      setMessage("❌ An error occurred while deleting the placement");
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
      package: "",
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
          <Typography variant="h6" mb={1}>{editId ? "Edit Placement" : "Add Placement"}</Typography>
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
            label="Package" 
            name="package" 
            value={form.package} 
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
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit Placement')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* Placements List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Placements</Typography>
          {isLoading ? (
            <Typography>Loading placements...</Typography>
          ) : (
            <Grid container spacing={2}>
              {placements && placements.length > 0 ? placements.map((placement: Placement) => (
                <Grid item xs={12} key={placement._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    {placement.imageUrl && (
                      <Box component="img" src={placement.imageUrl} alt={placement.studentName} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #eee' }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{placement.studentName}</Typography>
                      <Typography variant="body2" color="text.secondary">{placement.company} | {placement.role}</Typography>
                      <Typography variant="body2" color="text.secondary">Year: {placement.year} | Package: {placement.package}</Typography>
                      <Typography variant="caption" color="text.secondary">{placement.description}</Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(placement)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(placement)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No placements found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Placement</DialogTitle>
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
};


