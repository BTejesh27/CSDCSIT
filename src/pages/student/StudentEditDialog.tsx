import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, CircularProgress, Grid, Paper, Chip } from "@mui/material";
import { CloudUpload as CloudUploadIcon, Edit as EditIcon, Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, School as SchoolIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

interface EditData {
  name: string;
  mail: string;
  phonenumber: string;
  registration_number: string;
  batch: string;
  branch: string;
  resume: File | null;
}

interface Props {
  open: boolean;
  editData: EditData;
  setEditData: (data: EditData) => void;
  error: string;
  loading: boolean;
  onSave: () => void;
  onClose: () => void;
}

export default function StudentEditDialog({ open, editData, setEditData, error, loading, onSave, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ background: `linear-gradient(45deg, #7b1fa2, #512da8)`, color: 'white', m: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EditIcon />
          <Typography variant="h6" fontWeight={600}>Update Student Details</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
              variant="outlined"
              InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email Address"
              fullWidth
              value={editData.mail}
              onChange={e => setEditData({ ...editData, mail: e.target.value })}
              type="email"
              variant="outlined"
              InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={editData.phonenumber}
              inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "\\d*" }}
              onChange={e => {
                const val = e.target.value.replace(/[^\d]/g, "");
                setEditData({ ...editData, phonenumber: val });
              }}
              variant="outlined"
              InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Registration Number"
              fullWidth
              value={editData.registration_number.toUpperCase()}
              InputProps={{ readOnly: true, startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Batch"
              fullWidth
              value={editData.batch}
              onChange={e => setEditData({ ...editData, batch: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Branch"
              fullWidth
              value={editData.branch}
              onChange={e => setEditData({ ...editData, branch: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, border: `2px dashed #7b1fa2`, borderRadius: 2, textAlign: 'center', bgcolor: alpha('#7b1fa2', 0.05) }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 1, textTransform: 'none' }}
              >
                Upload New Resume
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setEditData({ ...editData, resume: e.target.files[0] });
                    }
                  }}
                />
              </Button>
              {editData.resume && (
                <Box sx={{ mt: 2 }}>
                  <Chip label={editData.resume.name} color="primary" variant="outlined" sx={{ fontWeight: 500 }} />
                </Box>
              )}
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                Only PDF files are allowed
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {error && (
          <Box sx={{ mt: 3, p: 2, bgcolor: alpha('#d32f2f', 0.1), borderRadius: 2 }}>
            <Typography color="error" variant="body2">{error}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={loading} variant="contained" sx={{ textTransform: 'none', minWidth: 120 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
