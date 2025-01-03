import React, { useState } from 'react';
import { Button, Container, Row, Col, Text, Card, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-iconly'; // Cool magnifying glass icon
import mockProperties from '../data/mockProperties'; // Adjust the path as needed

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <Container>
      {/* Hero Section */}
      <Row justify="center" align="center" css={{ height: '50vh', textAlign: 'center' }}>
        <Col>
          <Text h1>Welcome to RayRealty</Text>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
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
      </div>

      {/* No Featured Properties Message */}
      {mockProperties.length === 0 && (
        <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
          No featured properties at the moment. Check back later!
        </Text>
      )}
    </Container>
  );
};

export default HomePage;
