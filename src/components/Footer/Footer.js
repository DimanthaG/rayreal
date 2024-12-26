// src/components/Footer/Footer.js
import React from 'react';
import { Container, Grid, Text, Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <Container
      css={{
        padding: '0rem 0',
        backgroundColor: '#f0f0f0',
        marginTop: '2rem',
        borderTop: '1px solid #ccc',
      }}
    >
      <Grid.Container gap={2} justify="space-between">
        {/* Company Info */}
        <Grid xs={12} sm={4}>
          <div>
            <Text h4>Ray Real Estate</Text>
            <Text>
              Part of the Raytronics Group <br />
              330/08, Saman Mawatha, Lake Road, Borelesgamuwa
            </Text>
          </div>
        </Grid>

        {/* Quick Links */}
        <Grid xs={12} sm={4}>
          <div>
            <Text h4>Quick Links</Text>
            <Link href="/" css={{ display: 'block' }}>
              Home
            </Link>
            <Link href="/listings" css={{ display: 'block' }}>
              Listings
            </Link>
            <Link href="/about" css={{ display: 'block' }}>
              About Us
            </Link>
            <Link href="/contact" css={{ display: 'block' }}>
              Contact Us
            </Link>
            <Link href="/faq" css={{ display: 'block' }}>
              FAQ
            </Link>
            <Link href="/services" css={{ display: 'block' }}>
              Services
            </Link>
            <Link href="/mortgagecalculator" css={{ display: 'block' }}>
             Mortgage Calculator
            </Link>
            <Link href="/blog" css={{ display: 'block' }}>
                Blog
            </Link>
            <Link href="/testimonials" css={{ display: 'block' }}>
                Testimonials
            </Link>
            <Link href="/privacy-policy" css={{ display: 'block' }}>
                Privacy Policy
            </Link>
            <Link href="/agents" css={{ display: 'block' }}>
                Meet Our Agents
            </Link>

          </div>
        </Grid>

        {/* Contact Info */}
        <Grid xs={12} sm={4}>
          <div>
            <Text h4>Contact Us</Text>
            <Text>Dr. K H Lasantha Gunawardana: +94777727527</Text>
            <Text>Shamika Chandupa: +94726645529</Text>
            <Text>Dan Poddiwela: +94771125807</Text>
            <Text>
              Email: <a href="mailto:lasa_ray@yahoo.com">lasa_ray@yahoo.com</a>
            </Text>
          </div>
        </Grid>
      </Grid.Container>

      {/* Copyright */}
      <Text css={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
        &copy; {new Date().getFullYear()} Ray Real Estate. All rights reserved.
      </Text>
    </Container>
  );
};

export default Footer;
