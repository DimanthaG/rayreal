// src/components/AgentProfilesPage/AgentProfilesPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text, Button } from '@nextui-org/react';

const AgentProfilesPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://your-api-url.com/agents'); // Replace with your API endpoint
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Meet Our Agents
      </Text>
      <Grid.Container gap={2} justify="center">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <Grid xs={12} sm={6} md={4} key={agent.id}>
              <Card isHoverable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={agent.imageUrl}
                    objectFit="cover"
                    width="100%"
                    height={200}
                    alt={agent.name}
                  />
                </Card.Body>
                <Card.Footer>
                  <Text h4>{agent.name}</Text>
                  <Text css={{ color: '$gray700', marginBottom: '1rem' }}>
                    {agent.specialty}
                  </Text>
                  <Text>Email: <a href={`mailto:${agent.email}`}>{agent.email}</a></Text>
                  <Text>Phone: {agent.phone}</Text>
                  <Button color="primary" auto css={{ marginTop: '1rem' }}>
                    Contact Agent
                  </Button>
                </Card.Footer>
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
