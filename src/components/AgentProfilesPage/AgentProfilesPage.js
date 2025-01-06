// src/components/AgentProfilesPage/AgentProfilesPage.js
import React from 'react';
import { Container, Grid, Card, Text, Button } from '@nextui-org/react';
import mockAgents from '../data/mockAgents'; // Import mock data

const AgentProfilesPage = () => {
  // Function to detect mobile screens
  const isMobile = window.innerWidth <= 768;

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Meet Our Agents
      </Text>

      {/* Desktop Block: Visible only on larger screens */}
      {!isMobile && (
        <Grid.Container gap={2} justify="center">
          {mockAgents.length > 0 ? (
            mockAgents.map((agent) => (
              <Grid xs={12} sm={6} md={4} key={agent.id}>
                <Card isHoverable>
                  <Card.Body css={{ padding: '1.5rem' }}>
                    <Card.Image
                      src={agent.imageUrl}
                      objectFit="cover"
                      width="100%"
                      height={200}
                      alt={agent.name}
                      css={{ borderRadius: '10px', marginBottom: '1rem' }}
                    />
                    <Text h4 css={{ marginBottom: '1rem', textAlign: 'center' }}>
                      {agent.name}
                    </Text>
                    <Text css={{ marginBottom: '0.5rem' }}>
                      <b>Specialty:</b> {agent.specialty}
                    </Text>
                    <Text css={{ marginBottom: '0.5rem' }}>
                      <b>Email:</b>{' '}
                      <a
                        href={`mailto:${agent.email}`}
                        style={{ color: '#0070f3', textDecoration: 'underline' }}
                      >
                        {agent.email}
                      </a>
                    </Text>
                    <Text css={{ marginBottom: '0.5rem' }}>
                      <b>Phone:</b> {agent.phone}
                    </Text>
                    <Text css={{ marginBottom: '0.5rem' }}>{agent.describe}</Text>
                    <Button
                      color="primary"
                      auto
                      css={{ marginTop: '1rem', width: '100%' }}
                    >
                      Contact Agent
                    </Button>
                  </Card.Body>
                </Card>
              </Grid>
            ))
          ) : (
            <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
              No agents available at the moment.
            </Text>
          )}
        </Grid.Container>
      )}

      {/* Mobile Block: Visible only on smaller screens */}
      {isMobile && (
        <div>
          {mockAgents.length > 0 ? (
            mockAgents.map((agent) => (
              <div
                key={agent.id}
                style={{
                  marginBottom: '1rem',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                }}
              >
                <img
                  src={agent.imageUrl}
                  alt={agent.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                  }}
                />
                <Text h4 css={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {agent.name}
                </Text>
                <Text css={{ marginBottom: '0.5rem' }}>
                  <b>Specialty:</b> {agent.specialty}
                </Text>
                <Text css={{ marginBottom: '0.5rem' }}>
                  <b>Email:</b>{' '}
                  <a
                    href={`mailto:${agent.email}`}
                    style={{ color: '#0070f3', textDecoration: 'underline' }}
                  >
                    {agent.email}
                  </a>
                </Text>
                <Text css={{ marginBottom: '0.5rem' }}>
                  <b>Phone:</b> {agent.phone}
                </Text>
                <Text css={{ marginBottom: '0.5rem' }}>{agent.describe}</Text>
                <Button
                  color="primary"
                  auto
                  css={{ marginTop: '1rem', width: '100%' }}
                >
                  Contact Agent
                </Button>
              </div>
            ))
          ) : (
            <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
              No agents available at the moment.
            </Text>
          )}
        </div>
      )}
    </Container>
  );
};

export default AgentProfilesPage;
