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
              <Text css={{ marginTop: '1rem' }}>Dr. K H Lasantha Gunawardana: 0777727527</Text>
              <Text>Shamika Chandupa: +94 (72) 664 5529</Text>
              <Text>Dan Poddiwela: 0(77) 112 5807</Text>
              <Text css={{ marginTop: '1rem' }}>
                Email: <a href="mailto:lasa_ray@yahoo.com">lasa_ray@yahoo.com</a>
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;
