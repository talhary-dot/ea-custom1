import React, { useState } from "react";

export const url = import.meta.env.VITE_BACKEND_URL; // Base URL of your backend

function ImageUploader({ banner, fetchImages }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error,setError] = useState('')
  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files);

      const urls = files.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  };
  
  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("photos", image);
    });

    setUploading(true);
    if(!localStorage.getItem('token')) return  setError('no token found')
    try {
      const response = await fetch(`${url}/api/upload-${banner}`, {
        method: "POST",
        body: formData,
        headers:{
          authorization:"Bearer "+localStorage.getItem('token')
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setSelectedImages([]);
        setImageUrls([]);
        fetchImages();
        
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Images</h2>

      {/* File input for selecting images */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={styles.fileInput}
      />

      {/* Display previews for all selected images */}
      <div style={styles.imagePreviewContainer}>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index + 1}`}
            style={styles.imagePreview}
          />
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={selectedImages.length === 0 || uploading}
        style={{
          ...styles.uploadButton,
          backgroundColor: uploading ? "#ccc" : "green",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
      {error && <div>${error} </div>}
    </div>
  );
}

export default ImageUploader;

// CSS styles as a JavaScript object
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    marginBottom: "20px",
    marginTop: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  fileInput: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  imagePreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
  imagePreview: {
    maxWidth: "150px",
    maxHeight: "150px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  uploadButton: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    marginTop: "20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
};
