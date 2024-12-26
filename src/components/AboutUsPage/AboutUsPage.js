// src/components/AboutUsPage/AboutUsPage.js
import React from 'react';
import { Container, Grid, Card, Text, Spacer } from '@nextui-org/react';

const AboutUsPage = () => {
  return (
    <Container>
      {/* Company Mission Section */}
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        About Ray Real Estate
      </Text>
      <Text h4 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Ray Real Estate, part of the Raytronics Group, is dedicated to helping you find your dream property. 
        With years of expertise in real estate, we specialize in residential, commercial, and land properties.
      </Text>

      {/* Company Overview */}
      <Grid.Container gap={2}>
        <Grid xs={12} sm={6}>
          <Card isHoverable>
            <Card.Body>
              <Text h3>Our Mission</Text>
              <Text>
                At Ray Real Estate, we aim to deliver exceptional service, guiding you through every step of 
                the property buying or selling process. Our commitment to trust and transparency sets us apart.
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card isHoverable>
            <Card.Body>
              <Text h3>Our Values</Text>
              <Text>
                - Trust and Integrity <br />
                - Expertise in Real Estate <br />
                - Customer-Centric Approach
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      {/* Team Members Section */}
      <Text h2 css={{ textAlign: 'center', marginBottom: '1rem' }}>Meet Our Team</Text>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable>
            <Card.Body>
              <Text h4>Dr. K H Lasantha Gunawardana</Text>
              <Text>Contact: 0777727527</Text>
              <Text>Email: <a href="mailto:lasa_ray@yahoo.com">lasa_ray@yahoo.com</a></Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card isHoverable>
            <Card.Body>
              <Text h4>Shamika Chandupa</Text>
              <Text>Contact: +94 (72) 664 5529</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card isHoverable>
            <Card.Body>
              <Text h4>Dan Poddiwela</Text>
              <Text>Contact: 0(77) 112 5807</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      {/* Company Location */}
      <Text h2 css={{ textAlign: 'center', marginBottom: '1rem' }}>Our Location</Text>
      <Text css={{ textAlign: 'center', marginBottom: '1rem' }}>
        330/08, Saman Mawatha, Lake Road, Borelesgamuwa
      </Text>
      <iframe
        title="Google Maps Location"
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
          '330/08, Saman Mawatha, Lake Road, Borelesgamuwa'
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

export default AboutUsPage;
