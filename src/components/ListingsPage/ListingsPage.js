// src/components/ListingsPage/ListingsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text, Button, Input, Spacer, Row } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import mockProperties from '../data/mockProperties'; // Import mock data
const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('https://your-api-url.com/properties'); // Replace with your API endpoint
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) =>
    listing.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Property Listings
      </Text>

      {/* Search Bar */}
      <Container css={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Input
          clearable
          bordered
          placeholder="Search for properties..."
          onChange={(e) => setSearchQuery(e.target.value)}
          css={{ width: '50%' }}
        />
        <Spacer y={1} />
      </Container>

      <Row justify="center" wrap="wrap" css={{ gap: '1rem' }}>
      {mockProperties.map((property, index) => (
          <Card key={index} isHoverable css={{ maxWidth: '300px', margin: '0 auto' }}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={property.images[0]} // Display the first image from the array
                objectFit="cover"
                width="100%"
                height={200}
                alt={property.name}
              />
            </Card.Body>
            <Card.Footer css={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Text h4 css={{ marginRight: "auto", fontWeight: "bold" }}>
                {property.name}
              </Text>
              <Text h5 css={{ color: "$gray700" }}>
                {property.price}
              </Text>
              <Button color="primary" auto as="a" href={`/property/${property.id}`}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </Row>

      {/* No Results Message */}
      {filteredListings.length === 0 && (
        <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
          No properties found matching your search criteria.
        </Text>
      )}
    </Container>
  );
};

export default ListingsPage;
