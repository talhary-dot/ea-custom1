import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "../uploader";
import toast, { Toaster } from "react-hot-toast"; // Import toast
import "./index.css"; // Import the CSS file

const Uploaded = ({ folder, fetchImages, imagesOne }) => {
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [imageName, setImageName] = useState(""); // State to store the image name
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for hidden file input

  // Fetch images from the server when the component mounts
  useEffect(() => {
    fetchImages();
  }, []); // Empty dependency array ensures this runs only once

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value); // Store the image name
  };

  const handleReplaceClick = (name) => {
    setImageName(name); // Set the image name to replace
    if (fileInputRef.current) fileInputRef.current.click(); // Trigger file input click
  };

  const handleReplaceFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading toast
    const loadingToast = toast.loading("Replacing image...");

    // Create form data with the selected file and current image name
    const formData = new FormData();
    formData.append("image", file);
    formData.append("ImageName", imageName);

    try {
      const response = await axios.post(url + `/api/change-${folder}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Dismiss loading toast and show success toast
        toast.dismiss(loadingToast);
        toast.success("Image replaced successfully!");

        // Fetch the updated list of images
        await fetchImages();
      }
    } catch (error) {
      console.error("Error replacing image:", error);
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error("Failed to replace image");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !imageName) {
      toast.error("Please select a file and provide an image name");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("image", selectedFile); // Append the file
    formData.append("ImageName", imageName); // Append the image name

    try {
      const response = await axios.post(url + `/api/change-${folder}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Dismiss loading toast and show success toast
        toast.dismiss(loadingToast);
        toast.success("Image uploaded successfully!");

        // Fetch the updated list of images after upload
        fetchImages();
        // Reset form fields
        setSelectedFile(null);
        setImageName("");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div>
      {/* Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4ade80",
              color: "white",
            },
            duration: 3000,
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
            duration: 3000,
          },
          loading: {
            style: {
              background: "#3b82f6",
              color: "white",
            },
          },
        }}
      />

      {/* Hidden file input for replacement */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleReplaceFileChange}
        style={{ display: "none" }}
      />

      {/* File Input and Upload Button */}
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <input
          type="text"
          placeholder="Enter image name"
          value={imageName}
          onChange={handleImageNameChange}
          className="text-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload Image
        </button>
      </div>

      {/* Display Images */}
      <div className="images-container">
        {imagesOne?.length > 0 &&
          imagesOne.map((el, index) => (
            <div key={index} className="image-card">
              <button
                onClick={() => handleReplaceClick(el)}
                className="replace-button"
              >
                Replace
              </button>
              <img
                src={el + "?t=" + Date.now()}
                alt={`Image ${index}`}
                className="image"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export { Uploaded };
