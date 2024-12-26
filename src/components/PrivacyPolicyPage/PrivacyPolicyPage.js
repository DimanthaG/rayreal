// src/components/PrivacyPolicyPage/PrivacyPolicyPage.js
import React from 'react';
import { Container, Text } from '@nextui-org/react';

const PrivacyPolicyPage = () => {
  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Privacy Policy
      </Text>
      <Text>
        At Ray Real Estate, we are committed to protecting your privacy. This privacy policy explains how
        we collect, use, and safeguard your personal information.
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>1. Information We Collect</Text>
      <Text>
        We may collect the following types of information:
        <ul>
          <li>Personal information, such as name, email address, and phone number.</li>
          <li>Property-related information for listing purposes.</li>
          <li>Browsing data, including cookies and IP addresses.</li>
        </ul>
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>2. How We Use Your Information</Text>
      <Text>
        The information we collect is used to:
        <ul>
          <li>Provide and improve our services.</li>
          <li>Communicate with you about your inquiries or property listings.</li>
          <li>Personalize your experience on our website.</li>
        </ul>
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>3. Sharing Your Information</Text>
      <Text>
        We do not sell or share your personal information with third parties, except as required by law or
        with your explicit consent.
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>4. Your Rights</Text>
      <Text>
        You have the right to:
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections or deletions of your personal data.</li>
          <li>Opt out of receiving marketing communications.</li>
        </ul>
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>5. Data Security</Text>
      <Text>
        We implement appropriate security measures to protect your personal information against unauthorized
        access, alteration, or disclosure.
      </Text>

      <Text h3 css={{ marginTop: '2rem' }}>6. Contact Us</Text>
      <Text>
        If you have any questions or concerns about this privacy policy, please contact us at:
        <ul>
          <li>Email: <a href="mailto:lasa_ray@yahoo.com">lasa_ray@yahoo.com</a></li>
          <li>Phone: Dr. K H Lasantha Gunawardana - 0777727527</li>
        </ul>
      </Text>

      <Text css={{ marginTop: '2rem', textAlign: 'center' }}>
        This privacy policy is effective as of [Insert Date].
      </Text>
    </Container>
  );
};

export default PrivacyPolicyPage;
