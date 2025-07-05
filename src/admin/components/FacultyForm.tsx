import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function FacultyForm() {
  const [form, setForm] = useState({
    name: "",
    mail: "",
    number: "",
    location: "",
    qualifications: "",
    subjects: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3000/faculty/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        qualifications: form.qualifications.split(","),
        subjects: form.subjects.split(","),
      }),
    });
    setForm({ name: "", mail: "", number: "", location: "", qualifications: "", subjects: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
      <TextField label="Mail" name="mail" value={form.mail} onChange={handleChange} required />
      <TextField label="Number" name="number" value={form.number} onChange={handleChange} />
      <TextField label="Location" name="location" value={form.location} onChange={handleChange} />
      <TextField label="Qualifications (comma separated)" name="qualifications" value={form.qualifications} onChange={handleChange} />
      <TextField label="Subjects (comma separated)" name="subjects" value={form.subjects} onChange={handleChange} />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
}