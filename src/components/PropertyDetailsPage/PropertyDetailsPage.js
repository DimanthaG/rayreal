// src/components/PropertyDetailsPage/PropertyDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Text, Grid, Card, Button, Spacer } from '@nextui-org/react';

const PropertyDetailsPage = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://your-api-url.com/properties/${id}`); // Replace with your API endpoint
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <Container>
        <Text h3 css={{ textAlign: 'center', marginTop: '2rem' }}>
          Loading property details...
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        {property.name}
      </Text>

      <Grid.Container gap={2}>
        <Grid xs={12} sm={6}>
          <Card isHoverable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={property.imageUrl}
                objectFit="cover"
                width="100%"
                height={400}
                alt={property.name}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Text h3>Price: {property.price}</Text>
          <Spacer y={0.5} />
          <Text>{property.description}</Text>
          <Spacer y={1} />
          <Text css={{ marginTop: '1rem' }}>
            <b>Address:</b> {property.address}
          </Text>
          <Spacer y={1} />
          <Button
            color="primary"
            auto
            as="a"
            href={`mailto:lasa_ray@yahoo.com?subject=Schedule a Visit for ${property.name}`}
          >
            Schedule a Visit
          </Button>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />
      <Text h2 css={{ textAlign: 'center', marginBottom: '1rem' }}>
        Location and Nearby Amenities
      </Text>
      <iframe
        title="Google Maps"
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
          property.address || 'Default Location'
        )}`}
        style={{
          border: 0,
          width: '100%',
          height: '400px',
        }}
        allowFullScreen
      ></iframe>
    </Container>
  );
};

export default PropertyDetailsPage;
