import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";


export function InternshipForm() {
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    year: "",
    stipend: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    await fetch("http://localhost:3000/internships", {
      method: "POST",
      body: data,
    });
    setForm({ studentName: "", company: "", role: "", year: "", stipend: "", description: "" });
    setImage(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Student Name" name="studentName" value={form.studentName} onChange={handleChange} required />
      <TextField label="Company" name="company" value={form.company} onChange={handleChange} required />
      <TextField label="Role" name="role" value={form.role} onChange={handleChange} required />
      <TextField label="Year" name="year" value={form.year} onChange={handleChange} required />
      <TextField label="Stipend" name="stipend" value={form.stipend} onChange={handleChange} required />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} required />
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
}