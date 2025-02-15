import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Text, Card, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-iconly';
import mockProperties from '../data/mockProperties'; // Adjust the path as needed
import TiltedCard from "../TiltedCard/TiltedCard";
import { Image } from '@nextui-org/react';
import image from '../../assets/images/RayRealty.svg';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const navigate = useNavigate();

  // Shuffle and select 6 random properties
  useEffect(() => {
    const getRandomProperties = (properties, count) => {
      const shuffled = [...properties].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    setFeaturedProperties(getRandomProperties(mockProperties, 6));
  }, []);

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
              src={image}
              alt="Default Image"
              css={{ objectFit: 'cover' }}
            />          <Text h4>Your one-stop destination for finding your dream property.</Text>
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
        {featuredProperties.map((property, index) => (
           <TiltedCard
           key={index}
           imageSrc={property.images[0]} // Display the first image from the array
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
             <Button color="primary" auto as="a" href={`/property/${property.id}`}>
               View Details
             </Button>
           }
         />
        ))}
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
