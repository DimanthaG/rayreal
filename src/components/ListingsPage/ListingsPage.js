// src/components/ListingsPage/ListingsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text, Button, Input, Spacer } from '@nextui-org/react';
import { Link } from 'react-router-dom';

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

      {/* Listings Grid */}
      <Grid.Container gap={2} justify="center">
        {filteredListings.map((listing) => (
          <Grid xs={12} sm={6} md={4} key={listing.id}>
            <Card isHoverable isPressable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={listing.imageUrl}
                  objectFit="cover"
                  width="100%"
                  height={200}
                  alt={listing.name}
                />
              </Card.Body>
              <Card.Footer>
                <Text h4 css={{ marginRight: 'auto' }}>
                  {listing.name}
                </Text>
                <Text h5 css={{ color: '$gray700' }}>
                  {listing.price}
                </Text>
                <Link to={`/property/${listing.id}`}>
                  <Button color="primary" auto>
                    View Details
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>

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
