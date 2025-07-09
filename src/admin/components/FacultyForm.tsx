import { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";

export default function FacultyForm() {
  const [form, setForm] = useState({
    name: "",
    mail: "",
    number: "",
    location: "",
    qualifications: "",
    subjects: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      
      // Convert image to base64 if selected
      if (selectedImage) {
        console.log("📤 Uploading image to backend:", selectedImage.name, "Size:", selectedImage.size, "bytes");
        
        const reader = new FileReader();
        imageData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read image file"));
          reader.readAsDataURL(selectedImage);
        });
        
        console.log("🔄 Image converted to base64, length:", imageData.length);
      }

      const payload = {
        ...form,
        qualifications: form.qualifications.split(",").map(q => q.trim()).filter(q => q),
        subjects: form.subjects.split(",").map(s => s.trim()).filter(s => s),
        image: imageData, // Send base64 data as image field
        imageName: selectedImage ? selectedImage.name : "", // Send original filename
      };

      console.log("📤 Sending faculty data to backend:", {
        ...payload,
        image: imageData ? `[Base64 image data - ${imageData.length} chars]` : "No image",
        imageName: selectedImage ? selectedImage.name : "No image file"
      });

      const facultyRes = await fetch("http://localhost:3000/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const facultyResult = await facultyRes.text(); // Use text() since backend sends string responses

      console.log("📥 Backend response:", facultyRes.status, facultyResult);

      if (facultyRes.ok) {
        setMessage(`✅ ${facultyResult}`);
        setForm({
          name: "",
          mail: "",
          number: "",
          location: "",
          qualifications: "",
          subjects: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        setMessage(`❌ ${facultyResult || 'Failed to save faculty'}`);
      }
    } catch (error) {
      setMessage("❌ An error occurred while submitting the form");
      console.error("❌ Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}
      
      <TextField 
        label="Name" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        required 
      />
      
      <TextField 
        label="Mail" 
        name="mail" 
        value={form.mail} 
        onChange={handleChange} 
        required 
      />
      
      <TextField 
        label="Number" 
        name="number" 
        value={form.number} 
        onChange={handleChange} 
      />
      
      <TextField 
        label="Location" 
        name="location" 
        value={form.location} 
        onChange={handleChange} 
      />
      
      <TextField 
        label="Qualifications (comma separated)" 
        name="qualifications" 
        value={form.qualifications} 
        onChange={handleChange} 
      />
      
      <TextField 
        label="Subjects (comma separated)" 
        name="subjects" 
        value={form.subjects} 
        onChange={handleChange} 
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
              sx={{ 
                margin: '8px 0', 
                fontSize: '14px', 
                color: '#666' 
              }}
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