import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Text, Input, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-iconly';
import TiltedCard from '../TiltedCard/TiltedCard';
import rayRealtyLogo from '../../assets/images/RayRealty.svg'; // Adjust path if needed
import SEO from '../SEO/SEO';

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
    <>
      <SEO 
        title="Home"
        description="Find your dream property in Sri Lanka with RayRealty. Browse through our exclusive collection of houses, lands, and commercial properties."
        keywords={[
          'real estate',
          'property',
          'Sri Lanka',
          'houses',
          'lands',
          'commercial property',
          'Boralesgamuwa',
          'property listing'
        ]}
      />
      <Container css={{
        '@xsMax': {
          padding: '$sm'
        }
      }}>
        {/* Hero Section */}
        <Row 
          justify="center" 
          align="center" 
          css={{ 
            minHeight: '40vh',
            textAlign: 'center',
            pt: '$xl',
            '@xsMax': {
              minHeight: 'auto',
              py: '$xl'
            }
          }}
        >
          <Col css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            '@xsMax': {
              padding: 0,
              width: '100%'
            }
          }}>
            <div css={{
              width: '100%',
              maxWidth: '180px',
              margin: '0 auto',
              '@xsMax': {
                maxWidth: '150px'
              }
            }}>
              <Image
                src={rayRealtyLogo}
                alt="RayRealty Logo"
                css={{ 
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            <Text 
              h4 
              css={{
                margin: '$xl 0 $lg',
                maxWidth: '600px',
                '@xsMax': {
                  fontSize: '$md',
                  margin: '$lg 0',
                  maxWidth: '85%',
                  lineHeight: '1.4'
                }
              }}
            >
              Your one-stop destination for finding your dream property.
            </Text>

            <div css={{ 
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
              '@xsMax': {
                maxWidth: '85%'
              }
            }}>
              <Row 
                css={{ 
                  gap: '$sm',
                  '@xsMax': {
                    flexDirection: 'column'
                  }
                }}
              >
                <Input
                  clearable
                  bordered
                  placeholder="Search for properties..."
                  contentLeft={<Search set="bold" primaryColor="gray" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  css={{ 
                    flex: 1
                  }}
                />
                <Button 
                  color="primary" 
                  auto
                  onClick={handleSearch}
                  css={{
                    '@xsMax': {
                      width: '100%'
                    }
                  }}
                >
                  Search
                </Button>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Featured Properties Section */}
        <Text 
          h2 
          css={{ 
            textAlign: 'center', 
            margin: '2rem 0',
            '@xsMax': {
              fontSize: '$2xl',
              margin: '$lg 0'
            }
          }}
        >
          Featured Properties
        </Text>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            justifyContent: 'center',
          }}
        >
          {featuredProperties.map((property) => {
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
                containerHeight="250px"
                containerWidth="100%"
                imageHeight="250px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <Button 
                    color="primary" 
                    auto 
                    as="a" 
                    href={`/property/${property._id || property.id}`}
                    css={{
                      '@xsMax': {
                        fontSize: '$sm',
                        padding: '$xs $sm'
                      }
                    }}
                  >
                    View Details
                  </Button>
                }
              />
            );
          })}
        </div>

        {/* No Featured Properties Message */}
        {featuredProperties.length === 0 && (
          <Text 
            h4 
            css={{ 
              textAlign: 'center', 
              marginTop: '2rem',
              '@xsMax': {
                fontSize: '$lg',
                marginTop: '$lg'
              }
            }}
          >
            No featured properties at the moment. Check back later!
          </Text>
        )}
      </Container>
    </>
  );
};

export default HomePage;
