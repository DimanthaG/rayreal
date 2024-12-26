// src/components/TestimonialsPage/TestimonialsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text } from '@nextui-org/react';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://your-api-url.com/testimonials'); // Replace with your API endpoint
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        What Our Clients Say
      </Text>
      <Grid.Container gap={2} justify="center">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <Grid xs={12} sm={6} md={4} key={testimonial.id}>
              <Card isHoverable>
                <Card.Body>
                  <Text h4 css={{ marginBottom: '1rem' }}>
                    {testimonial.clientName}
                  </Text>
                  <Text>"{testimonial.message}"</Text>
                  <Text css={{ marginTop: '1rem', color: '$gray700' }}>
                    - {testimonial.date}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          ))
        ) : (
          <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
            No testimonials available at the moment.
          </Text>
        )}
      </Grid.Container>
    </Container>
  );
};

export default TestimonialsPage;
