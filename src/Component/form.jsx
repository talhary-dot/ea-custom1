import React, { useState } from "react";
import {url} from './uploader'
const FormComponent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    postcode: "",
    email: "",
    phone: "",
    details: "",
  });
 const [loading,setLoading] = useState(false)
  const [images, setImages] = useState([]); // To store image previews
  const [files, setFiles] = useState([]); // To store actual file objects

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files); // Convert FileList to an array
    const imagePreviews = uploadedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...imagePreviews]);
    setFiles([...files, ...uploadedFiles]);
  };

  // Handle image deletion
  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    setImages(updatedImages);
    setFiles(updatedFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Create a FormData object to send data and files
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.first_name);
    formDataToSend.append("lastName", formData.last_name);
    formDataToSend.append("postcode", formData.postcode);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("moreDetails", formData.details);

    // Append files to the FormData object
    if (files.length > 0) {
      formDataToSend.append("image", files[0]); // Only send the first image
    }

    try {
      const response = await fetch(url+"/form", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          postcode: "",
          email: "",
          phone: "",
          details: "",
        });
        setImages([]);
        setFiles([]);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }finally{

        setLoading(false)
    }
    
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-flex-box">
        <div className="d-form-box1">
          <label htmlFor="first-name">First Name</label>
        </div>
        <div className="d-form-box2">
          <input
            type="text"
            id="first-name"
            name="first_name"
            placeholder="Enter your first name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="main-flex-box">
        <div className="d-form-box1">
          <label htmlFor="last-name">Last Name</label>
        </div>
        <div className="d-form-box2">
          <input
            type="text"
            id="last-name"
            name="last_name"
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="main-flex-box">
        <div className="d-form-box1">
          <label htmlFor="postcode">Postcode</label>
        </div>
        <div className="d-form-box2">
          <input
            type="text"
            id="postcode"
            name="postcode"
            placeholder="Enter your postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="main-flex-box">
        <div className="d-form-box1">
          <label htmlFor="email">Email</label>
        </div>
        <div className="d-form-box2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="main-flex-box">
        <div className="d-form-box1">
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="d-form-box2">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <label htmlFor="details">More Details About Your Request</label>
      <textarea
        id="details"
        name="details"
        rows="5"
        placeholder="Provide more details about your request"
        value={formData.details}
        onChange={handleInputChange}
        required
      ></textarea>

      <label className="upload-label">
        Upload picture
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>

      <div
        className="preview-container"
        style={{
          display: "flex",
          overflowY: "scroll",
          flexDirection: "row",
        }}
        id="preview-container"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="image-preview"
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={image.preview}
              alt={`Preview ${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            />
            <button
              onClick={() => handleDelete(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button type="submit"  disabled={loading} >
        {loading?"Submitting...":"Send"}
      </button>
    </form>
  );
};

export default FormComponent;
