import { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";

export default function PlacementForm() {
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    year: "",
    package: "",
    description: "",
    imagePath: "", 
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsUploading(true);

    try {
      const payload = {
        ...form,
        year: Number(form.year),
        package: Number(form.package),
      };

      const placementRes = await fetch("http://localhost:3000/placements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const placementResult = await placementRes.json();

      if (placementRes.ok) {
        setMessage(`✅ ${placementResult.message}`);
        setForm({
          studentName: "",
          company: "",
          role: "",
          year: "",
          package: "",
          description: "",
          imagePath: "",
        });
      } else {
        setMessage(`❌ ${placementResult.message || 'Failed to save placement'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

      <TextField 
        label="Image Path" 
        name="imagePath" 
        value={form.imagePath} 
        onChange={handleChange} 
        required 
        helperText="e.g. public/images/purplelane.jpg"
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Submit'}
      </Button>
    </Box>
  );
}