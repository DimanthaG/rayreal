import React, { useState } from 'react';
import { Container, Input, Button, Text, Textarea } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // For multiple image uploads
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Basic validation: require name, price, and at least one image
    if (!name || !price || images.length === 0) {
      setMessage('Please provide at least a name, price, and one image.');
      return;
    }

    // Build the form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('type', type);
    formData.append('lotSize', lotSize);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('contactPhone', contactPhone);
    formData.append('contactEmail', contactEmail);

    // Append each selected image file
   // When appending files, change the key to 'imageUrls'
for (let i = 0; i < images.length; i++) {
    formData.append('imageUrls', images[i]);
  }
  

    try {
      const response = await fetch('https://server-realty.vercel.app/api/properties', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          // No 'Content-Type' here—FormData sets it automatically.
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add property.');
      }

      const data = await response.json();
      setMessage(`Property added successfully: ${data.property.name}`);
      
      // Clear fields after success
      setName('');
      setPrice('');
      setDescription('');
      setAddress('');
      setType('');
      setLotSize('');
      setBedrooms('');
      setBathrooms('');
      setContactPhone('');
      setContactEmail('');
      setImages([]);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container css={{ marginTop: '2rem', maxWidth: '600px' }}>
        <Button onClick={() => navigate('/admin')} light css={{ marginTop: '1rem' }}>
        Back to Admin
      </Button>
      <Text h2>Add New Property</Text>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <Input
          type="text"
          label="Name"
          placeholder="Property Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          css={{ marginBottom: '1rem' }}
        />

        {/* Price */}
        <Input
          type="text"
          label="Price"
          placeholder="e.g. Rs. 1.5 Million per perch (Negotiable)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          css={{ marginBottom: '1rem' }}
        />

        {/* Description */}
        <Textarea
          label="Description"
          placeholder="Short description of the property..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Address */}
        <Input
          type="text"
          label="Address"
          placeholder="e.g. Malambe-Maharagama"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Type (Land, House, Apartment, etc.) */}
        <Input
          type="text"
          label="Type"
          placeholder="Land, House, etc."
          value={type}
          onChange={(e) => setType(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Lot Size */}
        <Input
          type="text"
          label="Lot Size"
          placeholder="e.g. 7 perches"
          value={lotSize}
          onChange={(e) => setLotSize(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Bedrooms */}
        <Input
          type="text"
          label="Bedrooms"
          placeholder="e.g. 3, N/A"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Bathrooms */}
        <Input
          type="text"
          label="Bathrooms"
          placeholder="e.g. 2, N/A"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Contact Phone */}
        <Input
          type="text"
          label="Contact Phone"
          placeholder="e.g. +94 7777 12345"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Contact Email */}
        <Input
          type="email"
          label="Contact Email"
          placeholder="e.g. info@example.com"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          css={{ marginBottom: '1rem' }}
        />

        {/* Images (Multiple) */}
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          required
          css={{ marginBottom: '1rem' }}
        />

        <Button type="submit">Add Property</Button>
      </form>

      {message && (
        <Text css={{ marginTop: '1rem', color: 'red' }}>
          {message}
        </Text>
      )}
      
    </Container>
  );
};

export default AddPropertyPage;
