import React from 'react';
import { Container, Row, Col, Card, Text } from '@nextui-org/react';

const ContactUsPage = () => {
  return (
    <Container>
      <Row justify="center" align="center" css={{ marginTop: '2rem' }}>
        <Col>
          <Text h1>Contact Us</Text>
          <Text h4>We’d love to hear from you. Reach out to us through the following:</Text>
        </Col>
      </Row>
      <Row css={{ marginTop: '2rem' }}>
        <Col>
          <Card variant="bordered">
            <Card.Body>
              <Text h4>Raytronics Group</Text>
              <Text>330/08, Saman Mawatha, Lake Road, Borelesgamuwa</Text>
              <Text css={{ marginTop: '1rem' }}>Dr. K H Lasantha Gunawardana: +94777727527</Text>
              <Text>Shamika Chandupa: +94726645529</Text>
              <Text>Dan Poddiwela: +94771125807</Text>
              <Text css={{ marginTop: '1rem' }}>
                Email: <a href="mailto:raytronicspvtltd@gmail.com">raytronicspvtltd@gmail.com</a>
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;
