import React, { useState, useEffect } from "react";
import { Container, Input, Text, Textarea, Button, Spacer } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to hold the property data
  const [propertyData, setPropertyData] = useState({
    name: "",
    price: "",
    description: "",
    address: "",
    type: "",
    lotSize: "",
    bedrooms: "",
    bathrooms: "",
    contactPhone: "",
    contactEmail: ""
  });
  
  // For handling optional new image uploads
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch property details on mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://server-realty.vercel.app/api/properties/${id}`);
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        const prop = data.property;
        setPropertyData({
          name: prop.name || "",
          price: prop.price || "",
          description: prop.description || "",
          address: prop.address || "",
          type: prop.type || "",
          lotSize: prop.lotSize || "",
          bedrooms: prop.bedrooms || "",
          bathrooms: prop.bathrooms || "",
          contactPhone: (prop.contact && prop.contact.phone) || "",
          contactEmail: (prop.contact && prop.contact.email) || ""
        });
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    };

    fetchProperty();
  }, [id]);

  // Handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for file input changes
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Submit updated data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Build form data
    const formData = new FormData();
    formData.append("name", propertyData.name);
    formData.append("price", propertyData.price);
    formData.append("description", propertyData.description);
    formData.append("address", propertyData.address);
    formData.append("type", propertyData.type);
    formData.append("lotSize", propertyData.lotSize);
    formData.append("bedrooms", propertyData.bedrooms);
    formData.append("bathrooms", propertyData.bathrooms);
    formData.append("contactPhone", propertyData.contactPhone);
    formData.append("contactEmail", propertyData.contactEmail);

    // Append new images if provided
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`https://server-realty.vercel.app/api/properties/${id}`, {
        method: "PUT", // or PATCH, depending on your API implementation
        headers: {
          Authorization: `Bearer ${token}`
          // Do NOT set 'Content-Type' here as FormData sets it automatically
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update property");
      }

      const data = await response.json();
      setMessage(`Property updated successfully: ${data.property.name}`);
      // Optionally, navigate back to admin page
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <Container css={{ maxWidth: "600px", marginTop: "2rem" }}>
      <Text h2>Edit Property</Text>
      {message && <Text css={{ color: "red", marginBottom: "1rem" }}>{message}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Property Name"
          name="name"
          value={propertyData.name}
          onChange={handleInputChange}
          required
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Price"
          placeholder="e.g. Rs. 1.5 Million per perch (Negotiable)"
          name="price"
          value={propertyData.price}
          onChange={handleInputChange}
          required
          css={{ marginBottom: "1rem" }}
        />
        <Textarea
          label="Description"
          placeholder="Short description of the property..."
          name="description"
          value={propertyData.description}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Address"
          placeholder="e.g. Malambe-Maharagama"
          name="address"
          value={propertyData.address}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Type"
          placeholder="Land, House, etc."
          name="type"
          value={propertyData.type}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Lot Size"
          placeholder="e.g. 7 perches"
          name="lotSize"
          value={propertyData.lotSize}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Bedrooms"
          placeholder="e.g. 3, N/A"
          name="bedrooms"
          value={propertyData.bedrooms}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Bathrooms"
          placeholder="e.g. 2, N/A"
          name="bathrooms"
          value={propertyData.bathrooms}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Contact Phone"
          placeholder="e.g. +94 7777 12345"
          name="contactPhone"
          value={propertyData.contactPhone}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />
        <Input
          label="Contact Email"
          placeholder="e.g. info@example.com"
          name="contactEmail"
          value={propertyData.contactEmail}
          onChange={handleInputChange}
          css={{ marginBottom: "1rem" }}
        />

        <Text>Upload New Images (Optional)</Text>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          css={{ marginBottom: "1rem" }}
        />

        <Button type="submit" color="primary">
          Update Property
        </Button>
      </form>
      <Spacer y={2} />
      <Button color="primary" auto onClick={() => navigate("/admin")}>
        Back to Admin
      </Button>
    </Container>
  );
};

export default EditPropertyPage;
