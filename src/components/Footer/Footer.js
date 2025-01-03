// src/components/Footer/Footer.js
import React from 'react';
import { Container, Grid, Text, Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#ff385c',
        marginTop: '2rem',
        padding: '2rem 0',
        color: '#fff',
      }}
    >
      <Container>
        <Grid.Container gap={2} justify="space-between">
          {/* Company Info */}
          <Grid xs={12} sm={4}>
            <div>
              <Text h4 css={{fontSize: '28px'}}>RayRealty</Text>
              <Text h6 css={{fontSize: '18px' , FontFace: 'bold'}}>
                Part of the Raytronics Group <br />
              </Text>
              <Text h6 css={{fontSize: '18px' , FontFace: 'bold', color: '#fff'}}> 
                330/08, Saman Mawatha<br /> Lake Road<br /> Boralesgamuwa
              </Text> 
            </div>
          </Grid>

          {/* Quick Links */}
          <Grid xs={12} sm={4}>
            <div>
              <Text h4 css={{fontSize: '28px'}}>Quick Links</Text>
              <Link href="/" css={{ display: 'block', color: '#fff' }}>
                Home
              </Link>
              <Link href="/listings" css={{ display: 'block', color: '#fff' }}>
                Listings
              </Link>
              <Link href="/about" css={{ display: 'block', color: '#fff' }}>
                About Us
              </Link>
              <Link href="/contact" css={{ display: 'block', color: '#fff' }}>
                Contact Us
              </Link>
              <Link href="/faq" css={{ display: 'block', color: '#fff' }}>
                FAQ
              </Link>
              <Link href="/services" css={{ display: 'block', color: '#fff' }}>
                Services
              </Link>
              <Link href="/mortgagecalculator" css={{ display: 'block', color: '#fff' }}>
                Mortgage Calculator
              </Link>
              <Link href="/blog" css={{ display: 'block', color: '#fff' }}>
                Blog
              </Link>
              <Link href="/testimonials" css={{ display: 'block', color: '#fff' }}>
                Testimonials
              </Link>
              <Link href="/privacy-policy" css={{ display: 'block', color: '#fff' }}>
                Privacy Policy
              </Link>
              <Link href="/agents" css={{ display: 'block', color: '#fff' }}>
                Meet Our Agents
              </Link>
            </div>
          </Grid>

          {/* Contact Info */}
          <Grid xs={12} sm={5}>
            <div>
              <Text h4 css={{fontSize: '28px'}}>Contact Us</Text>
              <Text h6>Dr. K H Lasantha Gunawardana: +94777727527</Text>
              <Text h6>Shamika Chandupa: +94726645529</Text>
              <Text h6>Dan Poddiwela: +94771125807</Text>
              <Text h6>
                Email: <a href="mailto:lasa_ray@yahoo.com" style={{ color: '#fff' }}>lasa_ray@yahoo.com</a>
              </Text>
            </div>
          </Grid>
        </Grid.Container>

        {/* Copyright */}
        <Text h5 css={{ textAlign: 'center', marginTop: '2rem', color: '#fff' }}>
          &copy; {new Date().getFullYear()} Ray Real Estate. All rights reserved.
        </Text>
      </Container>
    </div>
  );
};

export default Footer;
