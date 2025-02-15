import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Text, Input, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-iconly';
import TiltedCard from '../TiltedCard/TiltedCard';
import rayRealtyLogo from '../../assets/images/RayRealty.svg'; // Adjust path if needed

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);        // All fetched properties
  const [featuredProperties, setFeaturedProperties] = useState([]); // Random 6 properties
  const navigate = useNavigate();

  // Utility to shuffle and pick N items
  const getRandomProperties = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Fetch properties from your API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Adjust if your endpoint is different or needs auth
        const response = await fetch('https://server-realty.vercel.app/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        // data.properties should be the array of properties
        setProperties(data.properties);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  // Once we have properties, pick 6 at random
  useEffect(() => {
    if (properties.length > 0) {
      setFeaturedProperties(getRandomProperties(properties, 6));
    }
  }, [properties]);

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <Container>
      {/* Hero Section */}
      <Row justify="center" align="center" css={{ height: '50vh', textAlign: 'center' }}>
        <Col>
          <Image
            width={500}
            height={500}
            src={rayRealtyLogo}
            alt="RayRealty Logo"
            css={{ objectFit: 'cover' }}
          />
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
        {featuredProperties.map((property) => {
          // If your backend uses 'imageUrls', adapt here:
          const firstImage =
            property.imageUrls && property.imageUrls.length > 0
              ? property.imageUrls[0]
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';

          return (
            <TiltedCard
              key={property._id || property.id}
              imageSrc={firstImage}
              altText={property.name}
              captionText={`${property.name} - ${property.price}`}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <Button color="primary" auto as="a" href={`/property/${property._id || property.id}`}>
                  View Details
                </Button>
              }
            />
          );
        })}
      </div>

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
