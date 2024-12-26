// src/components/FAQPage/FAQPage.js
import React from 'react';
import { Container, Text, Collapse } from '@nextui-org/react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What types of properties do you offer?',
      answer:
        'We offer a wide range of properties, including residential homes, commercial spaces, and land for development.',
    },
    {
      question: 'How can I schedule a property viewing?',
      answer:
        'You can schedule a property viewing by visiting the property details page and clicking the "Schedule a Visit" button.',
    },
    {
      question: 'Do you provide assistance with financing?',
      answer:
        'Yes, we can connect you with trusted financial institutions to assist with your property purchase.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'We primarily operate in Borelesgamuwa and surrounding regions, but we have properties available across Sri Lanka.',
    },
    {
      question: 'How can I contact Ray Real Estate?',
      answer:
        'You can contact us through our Contact Us page or by calling Dr. K H Lasantha Gunawardana at 0777727527.',
    },
  ];

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Frequently Asked Questions
      </Text>
      <Collapse.Group>
        {faqs.map((faq, index) => (
          <Collapse key={index} title={faq.question}>
            <Text>{faq.answer}</Text>
          </Collapse>
        ))}
      </Collapse.Group>
    </Container>
  );
};

export default FAQPage;
