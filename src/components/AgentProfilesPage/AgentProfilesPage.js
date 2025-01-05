// src/components/AgentProfilesPage/AgentProfilesPage.js
import React from 'react';
import { Container, Grid, Card, Text, Button } from '@nextui-org/react';
import mockAgents from '../data/mockAgents'; // Import mock data

const AgentProfilesPage = () => {
  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Meet Our Agents
      </Text>
      <Grid.Container gap={2} justify="center">
        {mockAgents.length > 0 ? (
          mockAgents.map((agent) => (
            <Grid xs={12} sm={6} md={4} key={agent.id}>
              <Card isHoverable>
                <Card.Body css={{ p: 20 }}>
                  <Card.Image
                    src={agent.imageUrl}
                    objectFit="cover"
                    width="100%"
                    height={200}
                    alt={agent.name}
                    css={{ borderRadius: '10px' }}
                  />
                  <Text h4 css={{ margin: '1rem 0' }}>
                    {agent.name}
                  </Text>
                  <Text css={{ marginBottom: '0.5rem' }}>
                    <b>Specialty:</b> {agent.specialty}
                  </Text>
                  <Text css={{ marginBottom: '0.5rem' }}>
                    <b>Email:</b>{' '}
                    <a href={`mailto:${agent.email}`} style={{ color: '#0070f3' }}>
                      {agent.email}
                    </a>
                  </Text>
                  <Text css={{ marginBottom: '0.5rem' }}>
                    <b>Phone:</b> {agent.phone}
                  </Text>
                  <Text css={{ marginBottom: '0.5rem' }}>
                    {agent.describe}
                  </Text>
                  <Button color="primary" auto css={{ marginTop: '1rem' }}>
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
    </Container>
  );
};

export default AgentProfilesPage;
