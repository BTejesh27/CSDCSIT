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
        package: Number(form.package),
        imageUrl: imageData, // Send base64 data as imageUrl
        imageName: selectedImage ? selectedImage.name : "", // Send original filename
      };

      console.log("📤 Sending placement data to backend:", {
        ...payload,
        imageUrl: imageData ? `[Base64 image data - ${imageData.length} chars]` : "No image",
        imageName: selectedImage ? selectedImage.name : "No image file"
      });

      const placementRes = await fetch("http://localhost:3000/placements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const placementResult = await placementRes.text(); // Use text() since backend sends string responses

      console.log("📥 Backend response:", placementRes.status, placementResult);

      if (placementRes.ok) {
        setMessage(`✅ ${placementResult}`);
        setForm({
          studentName: "",
          company: "",
          role: "",
          year: "",
          package: "",
          description: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        setMessage(`❌ ${placementResult || 'Failed to save placement'}`);
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
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#666' }}>
              Selected: {selectedImage.name}
            </p>
          </Box>
        )}
        
        {imagePreview && (
          <Box sx={{ mt: 1 }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
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