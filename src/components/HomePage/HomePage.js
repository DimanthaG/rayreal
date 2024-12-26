import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Text, Card, Input, Grid } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-iconly'; // Cool magnifying glass icon

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Simulate fetching featured properties from API
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('https://your-api-url.com/properties/featured'); // Replace with your API endpoint
        const data = await response.json();
        setFeaturedProperties(data);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <Container>
      {/* Hero Section */}
      <Row justify="center" align="center" css={{ height: '50vh', textAlign: 'center' }}>
        <Col>
          <Text h1>Welcome to Ray Real Estate</Text>
          <Text h4>Your one-stop destination for finding your dream property.</Text>
          <Row justify="center" css={{ marginTop: '2rem' }}>
            <Input
              clearable
              bordered
              placeholder="Search for properties..."
              contentLeft={<Search set="bold" primaryColor="gray" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              css={{ width: '50%' }}
            />
            <Button color="primary" auto css={{ marginLeft: '1rem' }} onClick={handleSearch}>
              Search
            </Button>
          </Row>
        </Col>
      </Row>

      {/* Featured Properties Section */}
      <Text h2 css={{ textAlign: 'center', margin: '2rem 0' }}>
        Featured Properties
      </Text>
      <Grid.Container gap={2} justify="center">
        {featuredProperties.map((property) => (
          <Grid xs={12} sm={6} md={4} key={property.id}>
            <Card isHoverable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={property.imageUrl}
                  objectFit="cover"
                  width="100%"
                  height={200}
                  alt={property.name}
                />
              </Card.Body>
              <Card.Footer>
                <Text h4 css={{ marginRight: 'auto' }}>
                  {property.name}
                </Text>
                <Text h5 css={{ color: '$gray700' }}>
                  {property.price}
                </Text>
                <Button color="primary" auto as="a" href={`/property/${property.id}`}>
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      {/* No Featured Properties Message */}
      {featuredProperties.length === 0 && (
        <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
          No featured properties at the moment. Check back later!
        </Text>
      )}
    </Container>
  );
};

export default HomePage;
