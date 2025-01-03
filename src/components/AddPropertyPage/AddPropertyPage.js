import React, { useState } from 'react';
import { Container, Input, Button, Text } from '@nextui-org/react';

const AddPropertyPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!name || !price || !image) {
            setMessage('All fields are required, including an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add property.');
            }

            const data = await response.json();
            setMessage(`Property added successfully: ${data.property.name}`);
            setName('');
            setPrice('');
            setImage(null);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Container css={{ marginTop: '2rem', maxWidth: '600px' }}>
            <Text h2>Add New Property</Text>

            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Property Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    css={{ marginBottom: '1rem' }}
                />

                <Input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    css={{ marginBottom: '1rem' }}
                />

                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    css={{ marginBottom: '1rem' }}
                />

                <Button type="submit">Add Property</Button>
            </form>

            {message && <Text css={{ marginTop: '1rem', color: 'red' }}>{message}</Text>}
        </Container>
    );
};

export default AddPropertyPage;
