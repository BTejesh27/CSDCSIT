import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useNews } from "../../pages/home/api/useNews";

export function NewsForm() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch news
  const { data: newsList, refetch, isLoading } = useNews();

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
        date: form.date, // keep as string for backend
        image: imageData,
        imageName: selectedImage ? selectedImage.name : "",
      };

      let url = `${BACKEND_URL}/news`;
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `${BACKEND_URL}/news/${editId}`;
        method = "PUT";
      }

      const newsRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const newsResult = await newsRes.text();

      if (newsRes.ok) {
        setMessage(`✅ ${newsResult}`);
        setForm({
          title: "",
          description: "",
          date: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${newsResult || 'Failed to save news'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit news: populate form
  const handleEdit = (news: any) => {
    setForm({
      title: news.title || "",
      description: news.description || "",
      date: news.date ? news.date.slice(0, 10) : "",
    });
    setEditId(news._id);
    setSelectedImage(null);
    setImagePreview(news.imageUrl || null);
    setMessage(null);
  };

  // Delete news: open confirm dialog
  const handleDelete = (news: any) => {
    setDeleteId(news._id);
    setDeleteName(news.title);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/news/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete news'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while deleting the news");
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
      title: "",
      description: "",
      date: "",
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
          <Typography variant="h6" mb={1}>{editId ? "Edit News" : "Add News"}</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField 
            label="News Title" 
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
            rows={6}
            required 
          />
          <TextField 
            label="Date" 
            name="date" 
            type="date"
            value={form.date} 
            onChange={handleChange} 
            InputLabelProps={{ shrink: true }}
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
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit News')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* News List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All News</Typography>
          {isLoading ? (
            <Typography>Loading news...</Typography>
          ) : (
            <Grid container spacing={2}>
              {newsList && newsList.length > 0 ? newsList.map((news: any) => (
                <Grid item xs={12} key={news._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    {news.imageUrl && (
                      <Box component="img" src={news.imageUrl} alt={news.title} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #eee' }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{news.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{news.description}</Typography>
                      <Typography variant="caption" color="text.secondary">{news.date?.slice(0, 10)}</Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(news)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(news)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No news found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete News</DialogTitle>
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