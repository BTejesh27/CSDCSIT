import { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";

export function InternshipForm() {
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    year: "",
    stipend: "",
    description: "",
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
        year: Number(form.year),
        stipend: Number(form.stipend),
        image: imageData, // Send base64 data as image field (matching backend expectation)
        imageName: selectedImage ? selectedImage.name : "", // Send original filename
      };

      console.log("📤 Sending internship data to backend:", {
        ...payload,
        image: imageData ? `[Base64 image data - ${imageData.length} chars]` : "No image",
        imageName: selectedImage ? selectedImage.name : "No image file"
      });

      const internshipRes = await fetch("http://localhost:3000/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const internshipResult = await internshipRes.text(); // Use text() since backend sends string responses

      console.log("📥 Backend response:", internshipRes.status, internshipResult);

      if (internshipRes.ok) {
        setMessage(`✅ ${internshipResult}`);
        setForm({
          studentName: "",
          company: "",
          role: "",
          year: "",
          stipend: "",
          description: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        setMessage(`❌ ${internshipResult || 'Failed to save internship'}`);
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
        label="Stipend" 
        name="stipend" 
        value={form.stipend} 
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