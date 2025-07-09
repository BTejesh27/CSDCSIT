import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple static check, replace with real auth as needed
    if (username === "admin" && password === "admin") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 300, mx: "auto", mt: 10 }}>
      <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
}