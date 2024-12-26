import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Text } from '@nextui-org/react';

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchProperties(token);
    }
  }, [navigate]);

  const fetchProperties = async (token) => {
    try {
      const response = await fetch('/api/properties', {
        headers: { Authorization: token },
      });
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      alert(err.message);
      navigate('/login');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      if (!response.ok) throw new Error('Failed to delete property');
      setProperties(properties.filter((property) => property.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>
        Admin Dashboard
      </Text>
      <Button color="primary" css={{ marginBottom: '1rem' }}>
        Add New Property
      </Button>
      <Table>
        <Table.Header>
          <Table.Column>Property Name</Table.Column>
          <Table.Column>Price</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {properties.map((property) => (
            <Table.Row key={property.id}>
              <Table.Cell>{property.name}</Table.Cell>
              <Table.Cell>{property.price}</Table.Cell>
              <Table.Cell>
                <Button color="error" onClick={() => handleDelete(property.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default AdminPage;
