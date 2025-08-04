
import { useState } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useEvents } from "../../pages/home/api/useEvents";


export function EventForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch events
  const { data: events, refetch, isLoading } = useEvents();

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

  // Handle form submit for add/edit
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
        image: imageData,
        imageName: selectedImage ? selectedImage.name : "",
      };

      let url = "http://localhost:3000/events";
      let method: "POST" | "PUT" = "POST";
      if (editId) {
        url = `http://localhost:3000/events/${editId}`;
        method = "PUT";
      }

      const eventRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const eventResult = await eventRes.text();

      if (eventRes.ok) {
        setMessage(`✅ ${eventResult}`);
        setForm({
          title: "",
          description: "",
          date: "",
          location: "",
          organizer: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setEditId(null);
        refetch();
      } else {
        setMessage(`❌ ${eventResult || 'Failed to save event'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit event: populate form
  const handleEdit = (event: any) => {
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? event.date.slice(0, 10) : "",
      location: event.location || "",
      organizer: event.organizer || "",
    });
    setEditId(event._id);
    setSelectedImage(null);
    setImagePreview(event.imageUrl || null);
    setMessage(null);
  };

  // Delete event: open confirm dialog
  const handleDelete = (event: any) => {
    setDeleteId(event._id);
    setDeleteName(event.title);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/events/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete event'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while deleting the event");
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
      location: "",
      organizer: "",
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
          <Typography variant="h6" mb={1}>{editId ? "Edit Event" : "Add Event"}</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField 
            label="Event Title" 
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
            label="Date" 
            name="date" 
            type="date"
            value={form.date} 
            onChange={handleChange} 
            InputLabelProps={{ shrink: true }}
            required 
          />
          <TextField 
            label="Location" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Organizer" 
            name="organizer" 
            value={form.organizer} 
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
              {isUploading ? (editId ? 'Saving...' : 'Uploading...') : (editId ? 'Save Changes' : 'Submit Event')}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={isUploading}>Cancel</Button>
            )}
          </Box>
        </Box>
      </Grid>
      {/* Events List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Events</Typography>
          {isLoading ? (
            <Typography>Loading events...</Typography>
          ) : (
            <Grid container spacing={2}>
              {events && events.length > 0 ? events.map((event: any) => (
                <Grid item xs={12} key={event._id}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
                    {event.imageUrl && (
                      <Box component="img" src={event.imageUrl} alt={event.title} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #eee' }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{event.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                      <Typography variant="caption" color="text.secondary">{event.date?.slice(0, 10)} | {event.location} | {event.organizer}</Typography>
                    </Box>
                    <IconButton color="primary" onClick={() => handleEdit(event)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(event)}><Delete /></IconButton>
                  </Paper>
                </Grid>
              )) : (
                <Grid item xs={12}><Typography>No events found.</Typography></Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Event</DialogTitle>
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