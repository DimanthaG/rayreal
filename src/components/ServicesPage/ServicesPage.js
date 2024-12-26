// src/components/ServicesPage/ServicesPage.js
import React from 'react';
import { Container, Grid, Card, Text, Spacer } from '@nextui-org/react';

const ServicesPage = () => {
  const services = [
    {
      title: 'Property Sales',
      description:
        'We help clients buy and sell residential and commercial properties with ease.',
      imageUrl: '/images/property-sales.jpg',
    },
    {
      title: 'Land Acquisition',
      description:
        'Our team assists in finding and acquiring prime land for residential or commercial development.',
      imageUrl: '/images/land-acquisition.jpg',
    },
    {
      title: 'Real Estate Investment',
      description:
        'We offer guidance and expertise to help you make profitable real estate investments.',
      imageUrl: '/images/real-estate-investment.jpg',
    },
    {
      title: 'Property Management',
      description:
        'From tenant management to maintenance, we offer comprehensive property management services.',
      imageUrl: '/images/property-management.jpg',
    },
  ];

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Our Services
      </Text>
      <Grid.Container gap={2} justify="center">
        {services.map((service, index) => (
          <Grid xs={12} sm={6} key={index}>
            <Card isHoverable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={service.imageUrl}
                  objectFit="cover"
                  width="100%"
                  height={200}
                  alt={service.title}
                />
              </Card.Body>
              <Card.Footer>
                <Text h3>{service.title}</Text>
                <Text>{service.description}</Text>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer y={2} />
      <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
        Interested in any of our services?{' '}
        <a href="/contact" style={{ color: 'blue' }}>
          Contact us
        </a>{' '}
        to learn more!
      </Text>
    </Container>
  );
};

export default ServicesPage;
