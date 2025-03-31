import React from 'react';
import { Container, Row, Col, Text, Link } from '@nextui-org/react';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <>
      <footer style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
        padding: '3rem 0 2rem 0',
        marginTop: '4rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <Container css={{ maxWidth: '100%', padding: 0 }}>
          <Row justify="center" align="flex-start">
            {/* Logo Section */}
            <Col css={{ width: '250px', '@xsMax': { width: '100%', marginBottom: '2rem' } }}>
              <Link href="https://raytronics.lk" target="_blank" rel="noopener noreferrer">
                <Logo />
              </Link>
              <Text css={{ 
                color: '#666',
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}>
                Part of the Raytronics Group
              </Text>
              <Text css={{ 
                color: '#666',
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}>
                330/08, Saman Mawatha<br />
                Lake Road<br />
                Boralesgamuwa
              </Text>
            </Col>

            {/* Quick Links Section */}
            <Col css={{ width: '250px', '@xsMax': { width: '100%', marginBottom: '2rem' } }}>
              <Text h4 css={{ marginBottom: '1rem' }}>Quick Links</Text>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/listings">Listings</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </Col>

            {/* Contact Section */}
            <Col css={{ width: '250px', '@xsMax': { width: '100%' } }}>
              <Text h4 css={{ marginBottom: '1rem' }}>Contact Us</Text>
              <div>
                <Text css={{ marginBottom: '0.5rem' }}>Dr. K H Lasantha Gunawardana</Text>
                <Text css={{ color: '#666', marginBottom: '1rem' }}>+94777727527</Text>

                <Text css={{ marginBottom: '0.5rem' }}>Shamika Chandupa</Text>
                <Text css={{ color: '#666', marginBottom: '1rem' }}>+94726645529</Text>

                <Text css={{ marginBottom: '0.5rem' }}>Dan Poddiwela</Text>
                <Text css={{ color: '#666', marginBottom: '1rem' }}>+94771125807</Text>

                <Text css={{ marginBottom: '0.5rem' }}>Email:</Text>
                <Link href="mailto:lasa_ray@yahoo.com" css={{ color: '#666' }}>
                  lasa_ray@yahoo.com
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Business Details Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1rem 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        <Container css={{ maxWidth: '100%', padding: 0 }}>
          <Row css={{ 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            textAlign: 'left', 
            gap: '0.5rem'
          }}>
            <Text css={{ margin: 0 }}>Business name: Raytronics</Text>
            <Text css={{ margin: 0 }}>Business Email: lasa_ray@yahoo.com</Text>
            <Text css={{ margin: 0 }}>Developed by: <Link href="https://codavra.com" target="_blank" rel="noopener noreferrer">Codavra.com</Link></Text>
            <Text css={{ margin: 0 }}>Developer Email: info@codavra.com</Text>
            <Text css={{ margin: 0 }}>© {new Date().getFullYear()} Raytronics. All rights reserved.</Text>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
