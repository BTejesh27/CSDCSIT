import { useState, useMemo } from "react";
import { TextField, Button, Box, Alert, Grid, Typography, Paper, Link, MenuItem, Select, FormControl, InputLabel, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useGetSyllabi } from '../../pages/syllabus/getSyllabi';

export default function SyllabusForm() {
  // Edit and delete dialog state (must be inside the component)
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Delete syllabus
  const handleDelete = (syllabus: any) => {
    setDeleteId(syllabus._id);
    setDeleteName(syllabus.subject);
    setConfirmOpen(true);
  };
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/syllabus/${deleteId}`, { method: 'DELETE' });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to delete syllabus'}`);
      }
    } catch {
      setMessage('❌ Error deleting syllabus');
    } finally {
      setIsUploading(false);
      setConfirmOpen(false);
      setDeleteId(null);
      setDeleteName("");
    }
  };
  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
    setDeleteName("");
  };

  // Edit syllabus: open dialog
  const handleEdit = (syllabus: any) => {
    setEditId(syllabus._id);
    setEditData({ ...syllabus });
    setMessage(null);
  };
  const handleEditChange = (e: React.ChangeEvent<{ name?: string; value: unknown } | HTMLInputElement>) => {
    const { name, value } = (e.target as HTMLInputElement);
    setEditData((prev: any) => ({ ...prev, [name!]: value }));
  };
  const handleEditSave = async () => {
    if (!editData) return;
    setIsUploading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/syllabus/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        refetch();
        setEditId(null);
        setEditData(null);
      } else {
        setMessage(`❌ ${result || 'Failed to update syllabus'}`);
      }
    } catch {
      setMessage('❌ Error updating syllabus');
    } finally {
      setIsUploading(false);
    }
  };
  const handleEditCancel = () => {
    setEditId(null);
    setEditData(null);
  };
  const [form, setForm] = useState({
    subject: "",
    unit: "",
    year: "",
    branch: "",
    department: "CSD&CSIT",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  // Use API hook for syllabi
  const { data: syllabi = [], isLoading, refetch } = useGetSyllabi();

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown } | HTMLInputElement>) => {
    const { name, value } = (e.target as HTMLInputElement);
    setForm(prev => ({ ...prev, [name!]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsUploading(true);
    try {
      if (!selectedFile) {
        setMessage("❌ Please select a file to upload");
        setIsUploading(false);
        return;
      }
      const formData = new FormData();
      formData.append("subject", form.subject);
      formData.append("unit", form.unit);
      formData.append("year", form.year);
      formData.append("branch", form.branch);
      formData.append("department", form.department);
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:3000/syllabus/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(`✅ ${result}`);
        setForm({ subject: "", unit: "", year: "", branch: "", department: "CSD&CSIT" });
        setSelectedFile(null);
        refetch();
      } else {
        setMessage(`❌ ${result || 'Failed to upload syllabus'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while uploading the syllabus");
    } finally {
      setIsUploading(false);
    }
  };

  // Dropdown options
  const YEARS = [1, 2, 3, 4];
  const BRANCHES = ["CSD", "CSIT"];
  const UNITS = [1, 2, 3, 4, 5];
  // Default subjects for each year and branch
  const SUBJECTS_MAP: Record<string, Record<string, string[]>> = {
    CSD: {
      1: ["Mathematics-I", "Programming Basics", "Digital Logic"],
      2: ["Data Structures", "OOPs", "DBMS"],
      3: ["Operating Systems", "Web Technologies", "AI"],
      4: ["Cloud Computing", "Big Data", "Project"]
    },
    CSIT: {
      1: ["Mathematics-I", "IT Fundamentals", "Digital Logic"],
      2: ["Data Structures", "OOPs", "Networks"],
      3: ["Operating Systems", "Web Technologies", "ML"],
      4: ["Cyber Security", "Big Data", "Project"]
    }
  };

  // Subjects based on year and branch
  const subjectOptions = useMemo(() => {
    if (!form.year || !form.branch) return [];
    return SUBJECTS_MAP[form.branch]?.[form.year] || [];
  }, [form.year, form.branch]);

  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12} md={6}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: '#fff' }}>
          <Typography variant="h6" mb={1}>Upload Syllabus</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <FormControl fullWidth required>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={form.year}
              label="Year"
              onChange={handleChange}
            >
              {YEARS.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={form.branch}
              label="Branch"
              onChange={handleChange}
            >
              {BRANCHES.map(b => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={form.subject}
              label="Subject"
              onChange={handleChange}
              disabled={!form.year || !form.branch}
            >
              {subjectOptions.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Unit</InputLabel>
            <Select
              name="unit"
              value={form.unit}
              label="Unit"
              onChange={handleChange}
            >
              {UNITS.map(u => (
                <MenuItem key={u} value={u}>{u}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Department"
            name="department"
            value={form.department}
            InputProps={{ readOnly: true }}
            required
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ alignSelf: 'flex-start' }}
          >
            Upload File
            <input
              type="file"
              hidden
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">Selected: {selectedFile.name}</Typography>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit Syllabus'}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" mb={2}>Uploaded Syllabi</Typography>
          {isLoading ? (
            <Typography>Loading syllabi...</Typography>
          ) : syllabi.length === 0 ? (
            <Typography>No syllabi found.</Typography>

          ) : (
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {syllabi.map((syllabus) => (
                <Paper key={syllabus._id} sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column', gap: 1, position: 'relative' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight={600}>{syllabus.subject} (Unit: {syllabus.unit})</Typography>
                    <Box>
                      <IconButton size="small" color="primary" onClick={() => handleEdit(syllabus)}><Edit /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(syllabus)}><Delete /></IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2">Year: {syllabus.year} | Branch: {syllabus.branch} | Dept: {syllabus.department}</Typography>
                  <Typography variant="caption" color="text.secondary">Uploaded: {syllabus.uploadedAt ? syllabus.uploadedAt.slice(0, 10) : ''}</Typography>
                  <Link
                    href={`http://localhost:3000/${syllabus.filePath.replace(/\\/g, '/')}`}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                  >
                    {syllabus.fileName}
                  </Link>
                </Paper>
              ))}
      {/* Edit Dialog */}
      <Dialog open={!!editId} onClose={handleEditCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Syllabus</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth required>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={editData?.year || ''}
              label="Year"
              onChange={handleEditChange}
            >
              {YEARS.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={editData?.branch || ''}
              label="Branch"
              onChange={handleEditChange}
            >
              {BRANCHES.map(b => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={editData?.subject || ''}
              label="Subject"
              onChange={handleEditChange}
              disabled={!editData?.year || !editData?.branch}
            >
              {(SUBJECTS_MAP[editData?.branch]?.[editData?.year] || []).map((s: string) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Unit</InputLabel>
            <Select
              name="unit"
              value={editData?.unit || ''}
              label="Unit"
              onChange={handleEditChange}
            >
              {UNITS.map(u => (
                <MenuItem key={u} value={u}>{u}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Department"
            name="department"
            value={editData?.department || ''}
            InputProps={{ readOnly: true }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Syllabus</DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete <b>{deleteName}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
