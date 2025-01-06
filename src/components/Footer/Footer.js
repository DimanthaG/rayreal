import React, { useState, useEffect } from 'react';
import { Container, Grid, Text, Link , Image} from '@nextui-org/react';
import image from '../../assets/images/RayRealty.svg';

const DesktopFooter = () => (
  <div
    style={{
      width: '100%',
      backgroundColor: '#4169E1',
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
            <Text h4 css={{ fontSize: '28px' }}>RayRealty</Text>
            <Text h6 css={{ fontSize: '18px', fontWeight: 'bold' }}>
              Part of the Raytronics Group <br />
            </Text>
            <Text h6 css={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
              330/08, Saman Mawatha<br /> Lake Road<br /> Boralesgamuwa
            </Text>
          </div>
        </Grid>

        {/* Quick Links */}
        <Grid xs={12} sm={4}>
          <div>
            <Text h4 css={{ fontSize: '28px' }}>Quick Links</Text>
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
          </div>
        </Grid>

        {/* Contact Info */}
        <Grid xs={12} sm={4}>
          <div>
            <Text h4 css={{ fontSize: '28px' }}>Contact Us</Text>
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

const MobileFooter = () => (
  <div
    style={{
      width: '100%',
      backgroundColor: '#4169E1',
      marginTop: '2rem',
      padding: '1rem',
      color: '#fff',
      textAlign: 'center',
    }}
  >
    <Container>
        <Image
                  width={120}
                  height={120}
                  src={image}
                  alt="Default Image"
                  css={{ objectFit: 'cover' }}
        />      
      <Text h6 css={{ fontSize: '16px', marginBottom: '1rem' }}>
        Part of the Raytronics Group
      </Text>
      <Text css={{ fontSize: '16px', marginBottom: '1rem' }}>
        330/08, Saman Mawatha<br /> Lake Road<br /> Boralesgamuwa
      </Text>
      <Text css={{ fontSize: '16px', marginBottom: '1rem' }}>
        Contact: +94777727527 <br />
        Email: <a href="mailto:lasa_ray@yahoo.com" style={{ color: '#fff' }}>lasa_ray@yahoo.com</a>
      </Text>

      {/* Copyright */}
      <Text h5 css={{ marginTop: '2rem', color: '#fff' }}>
        &copy; {new Date().getFullYear()} Ray Real Estate. All rights reserved.
      </Text>
    </Container>
  </div>
);

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;
