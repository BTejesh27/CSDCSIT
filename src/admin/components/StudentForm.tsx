import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Alert, Grid, Typography, Paper
} from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

interface Student {
  _id: string;
  phonenumber: string;
  registration_number: string;
}

const initialState = {
  phonenumber: "",
  registration_number: "",
};

function downloadTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([
    ["phonenumber", "registration_number"]
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "student_bulk_template.xlsx");
}

function validateRows(rows: any[]): { valid: Student[]; errors: string[] } {
  const errors: string[] = [];
  const valid: Student[] = [];
  rows.forEach((row, idx) => {
    if (!row.phonenumber || !/^\d{10}$/.test(row.phonenumber)) {
      errors.push(`Row ${idx + 2}: Invalid phone number`);
      return;
    }
    if (!row.registration_number || typeof row.registration_number !== "string") {
      errors.push(`Row ${idx + 2}: Invalid registration number`);
      return;
    }
    valid.push({
      phonenumber: row.phonenumber,
      registration_number: row.registration_number,
      _id: row._id || "",
    });
  });
  return { valid, errors };
}

const StudentForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [bulkSuccess, setBulkSuccess] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteReg, setDeleteReg] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch students
  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const res = await fetch(`${BACKEND_URL}/studentS`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch {
      setStudents([]);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Bulk upload handler
  const handleBulkFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkErrors([]);
    setBulkSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      const { valid, errors } = validateRows(rows);
      if (errors.length) {
        setBulkErrors(errors);
        return;
      }
      setBulkUploading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/studentS/bulk-register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(valid.map(({ phonenumber, registration_number }) => ({ phonenumber, registration_number }))),
        });
        if (res.ok) {
          setBulkSuccess("✅ Bulk students registered");
          fetchStudents();
        } else {
          setBulkErrors(["❌ Error in bulk student register"]);
        }
      } catch {
        setBulkErrors(["❌ Error in bulk student register"]);
      } finally {
        setBulkUploading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/studentS/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("✅ Student login data created");
        setForm(initialState);
        fetchStudents();
      } else {
        setMessage("❌ Error creating student login data");
      }
    } catch {
      setMessage("❌ Error creating student login data");
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const handleDelete = (student: Student) => {
    setDeleteId(student._id);
    setDeleteReg(student.registration_number);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
  if (!deleteId) return;
  setLoading(true);
  setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/studentS/${deleteId}`, {
        method: "DELETE",
  });
  const result = await res.text();
  if (res.ok) {
        setMessage(`✅ ${result}`);
        fetchStudents();
      } else {
        setMessage(`❌ ${result || 'Failed to delete student'}`);
      }
    } catch {
      setMessage("❌ Error deleting student");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setDeleteId(null);
      setDeleteReg("");
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
    setDeleteReg("");
  };

  return (
    <Grid container spacing={4} alignItems="flex-start">
      {/* Form Left */}
      <Grid item xs={12} md={5}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: '#fff' }}>
          <Typography variant="h6" mb={1}>Create Student Login</Typography>
          {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
          <TextField
            label="Phone Number"
            name="phonenumber"
            value={form.phonenumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            label="Registration Number"
            name="registration_number"
            value={form.registration_number}
            onChange={handleChange}
            required
            placeholder="Enter registration number"
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Create Login"}
          </Button>
        </Box>
        {/* Bulk Upload */}
        <Box sx={{ mt: 4, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: '#fff' }}>
          <Typography variant="h6" mb={1}>Bulk Upload</Typography>
          <Button
            onClick={downloadTemplate}
            variant="contained"
            color="success"
            sx={{ mb: 2 }}
            type="button"
          >
            Download Excel Template
          </Button>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleBulkFile}
            disabled={bulkUploading}
            title="Upload Excel file for bulk student login creation"
            style={{ marginBottom: 8 }}
          />
          {bulkUploading && <Typography>Uploading...</Typography>}
          {bulkSuccess && <Alert severity="success" sx={{ mb: 1 }}>{bulkSuccess}</Alert>}
          {bulkErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 1 }}>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {bulkErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary" mt={2}>
            Only <b>phonenumber</b> (10 digits) and <b>registration_number</b> (string) columns are allowed.
          </Typography>
        </Box>
      </Grid>
      {/* Students List Right */}
      <Grid item xs={12} md={7}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>All Students</Typography>
          {isLoadingStudents ? (
            <Typography>Loading students...</Typography>
          ) : (
            <Grid container spacing={2}>
              {students.length === 0 ? (
                <Grid item xs={12}><Typography>No students found.</Typography></Grid>
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, overflowX: 'auto' }}>
                    <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                      <Box component="thead" sx={{ bgcolor: '#f5f5f5' }}>
                        <Box component="tr">
                          <Box component="th" sx={{ border: '1px solid #eee', px: 2, py: 1, textAlign: 'left' }}>Phone Number</Box>
                          <Box component="th" sx={{ border: '1px solid #eee', px: 2, py: 1, textAlign: 'left' }}>Registration Number</Box>
                          <Box component="th" sx={{ border: '1px solid #eee', px: 2, py: 1, textAlign: 'center' }}>Action</Box>
                        </Box>
                      </Box>
                      <Box component="tbody">
                        {students.map((student) => (
                          <Box component="tr" key={student._id}>
                            <Box component="td" sx={{ border: '1px solid #eee', px: 2, py: 1 }}>{student.phonenumber}</Box>
                            <Box component="td" sx={{ border: '1px solid #eee', px: 2, py: 1 }}>{student.registration_number}</Box>
                            <Box component="td" sx={{ border: '1px solid #eee', px: 2, py: 1, textAlign: 'center' }}>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(student)}
                                disabled={loading}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete student with registration number <b>{deleteReg}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default StudentForm;
