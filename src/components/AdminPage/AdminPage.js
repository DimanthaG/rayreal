import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Grid, Text } from "@nextui-org/react";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchProperties(token);
    }
  }, [navigate]);

  const fetchProperties = async (token) => {
    try {
        const response = await fetch('http://localhost:5000/api/properties', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
};

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete property");
      setProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Container>
      <Text h2 css={{ marginBottom: "1rem" }}>
        Manage Properties
      </Text>
      <Button onClick={() => navigate("/add-property")} css={{ marginBottom: "1rem" }}>
        Add New Property
      </Button>
      <Grid.Container gap={2} justify="flex-start">
        {properties.map((property) => (
          <Grid xs={12} sm={6} md={4} key={property.id}>
           <Card>
              <Card.Body>
                  <Text h3>{property.name}</Text>
                  <Text css={{ marginBottom: "1rem" }}>{property.price}</Text>
                  <img
                      src={`http://localhost:5000/api/image-proxy?url=${encodeURIComponent(property.imageUrl)}`}
                      alt={property.name}
                      style={{ width: '100%', height: 'auto' }}
                  />
                  <Button color="error" onPress={() => handleDelete(property.id)}>
                      Delete
                  </Button>
              </Card.Body>
          </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
};

export default AdminPage;
