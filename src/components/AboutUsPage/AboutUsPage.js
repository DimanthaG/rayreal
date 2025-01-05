import React from 'react';
import { Container, Grid, Card, Text, Spacer } from '@nextui-org/react';
import mockTeam from '../data/mockTeam';

const AboutUsPage = () => {
  return (
    <Container>
      {/* Company Mission Section */}
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        About RayRealty
      </Text>
      <Text h4 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        RayRealty, part of the Raytronics Group, is a new subdivision of the organization dedicated to helping you find your dream property.
        With years of expertise in real estate, we specialize in residential, commercial, and land properties,
        providing exceptional service and value.

        Raytronics also offers RayMedia and RayEdu, focusing on Social Media/Media marketing and educational services.
      </Text>

      {/* Company Overview */}
      <Grid.Container gap={2}>
        <Grid xs={12} sm={6}>
          <Card isHoverable>
            <Card.Body>
              <Text h3>Our Mission</Text>
              <Text>
                At Ray Real Estate, we aim to deliver exceptional service, guiding you through every step of
                the property buying or selling process. Our commitment to trust, transparency, and customer
                satisfaction sets us apart.
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
                - Customer-Centric Approach <br />
                - Innovation and Sustainability
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      {/* Team Members Section */}
      <Text h2 css={{ textAlign: 'center', marginBottom: '1rem' }}>Meet Our Team</Text>

      {/* Adjusted Grid for Team Members */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {mockTeam.map((member, index) => (
          <div
            key={member.id}
            style={{
              flex: '1 1 calc(33.333% - 2rem)', // Ensure three cards per row
              maxWidth: 'calc(33.333% - 2rem)', // Limit width to 33.333%
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Card isHoverable>
              <Card.Image
                src={member.image}
                objectFit="cover"
                width="100%"
                height={200}
                alt={member.name}
                css={{ borderRadius: '10px' }}
              />
              <Card.Body>
                <Text h4>{member.name}</Text>
                <Text>Contact: {member.contact}</Text>
                <Text>
                  Email: <a href={`mailto:${member.email}`}>{member.email}</a>
                </Text>
                <Text>{member.describe}</Text>
                <Text>
                <a href={`mailto:${member.website}`}>{member.website}</a>  
                </Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Spacer y={2} />

      {/* Company Location */}
      <Text h2 css={{ textAlign: 'center', marginBottom: '1rem' }}>Our Location</Text>
      <Text css={{ textAlign: 'center', marginBottom: '1rem' }}>
        330/08, Saman Mawatha, Lake Road, Borelesgamuwa
      </Text>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4642.265158982494!2d79.91045617566327!3d6.842604393155602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a9b925dae35%3A0x6b0b804d2da025a!2sSaman%20Mawatha%2C%20Boralesgamuwa%2C%20Sri%20Lanka!5e1!3m2!1sen!2sca!4v1736044995629!5m2!1sen!2sca"
        title="Google Maps Location"
        style={{
          border: 0,
          width: '100%',
          height: '400px',
          borderRadius: '10px',
        }}
        allowFullScreen
      ></iframe>
    </Container>
  );
};

export default AboutUsPage;
