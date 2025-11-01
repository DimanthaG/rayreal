// src/components/ContactUsPage/ContactUsPage.js

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Text,
  Input,
  Textarea,
  Spacer,
  Button
} from "@nextui-org/react";

const ContactUsPage = () => {
  // Simple click handler for the "Send Message" button
  const handleSubmit = () => {
    alert("Message Failed to send. PLease Contact through the given contact details");
  };

  return (
    <>
      {/* Full-width Hero */}
      <div
        style={{
          width: "100%",
          margin: 0,
          padding: "4rem 1rem",
          background: "linear-gradient(90deg, #eef2f3 0%, #ffffff 100%)",
          textAlign: "center",
          
        }}
      >
        <Container fluid css={{ px: 0 }}>
          <Text h1 css={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Contact Us
          </Text>
          <Text
            h4
            css={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "$accents7"
            }}
          >
            Got any questions about our services or scaling on our platform?
            We’re here to help. Contact our friendly team 24/7 for support.
          </Text>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid css={{ my: "3rem" }}>
        {/* 
          1) alignItems: 'stretch' ensures columns fill the row height.
          2) gap={2} for spacing, wrap="wrap" for responsiveness.
        */}
        <Row gap={2} wrap="wrap" css={{ alignItems: "stretch" }}>
          {/* LEFT COLUMN: Agent Info Cards */}
          <Col xs={12} sm={4}>
            {/* Card 1: Dr. K H Lasantha Goonawardena */}
            <Card variant="bordered" css={{ mb: "1rem", p: "1.5rem" }}>
              <Card.Body>
                <Text h3 css={{ mb: "0.5rem" }}>
                  Dr. K H Lasantha Goonawardena
                </Text>
                <Text b css={{ mb: "0.25rem" }}>
                  Managing Director & Realtor
                </Text>
                <Text css={{ color: "$accents7", mb: "0.5rem" }}>
                  A visionary leader committed to sustainable real estate development.
                </Text>
                <Text>
                  Phone: <b>+94 777 727 527</b>
                </Text>
                <Text>
                  Email:{" "}
                  <a
                    href="mailto:raytronicspvtltd@gmail.com"
                    style={{ color: "#0070f3", textDecoration: "underline" }}
                  >
                    chairman@raytronics.lk
                  </a>
                </Text>
              </Card.Body>
            </Card>

            {/* Card 2: Dan Yabesh Poddiwela */}
            <Card variant="bordered" css={{ mb: "1rem", p: "1.5rem" }}>
              <Card.Body>
                <Text h3 css={{ mb: "0.5rem" }}>
                  Dan Yabesh Poddiwela
                </Text>
                <Text b css={{ mb: "0.25rem" }}>
                  Specialty: Realtor
                </Text>
                <Text css={{ color: "$accents7", mb: "0.5rem" }}>
                  Dedicated to providing exceptional service and finding dream homes for clients.
                </Text>
                <Text>
                  Phone: <b>+94 771 125 807</b>
                </Text>
                <Text>
                  Email:{" "}
                  <a
                    href="mailto:danpoddi@gmail.com"
                    style={{ color: "#0070f3", textDecoration: "underline" }}
                  >
                    sales@raytronics.lk
                  </a>
                </Text>
              </Card.Body>
            </Card>

            {/* Card 3: Shamika Chandupa Mankirathne */}
            <Card variant="bordered" css={{ p: "1.5rem" }}>
              <Card.Body>
                <Text h3 css={{ mb: "0.5rem" }}>
                  Shamika Chandupa Mankirathne
                </Text>
                <Text b css={{ mb: "0.25rem" }}>
                  Specialty: Social Media Strategist
                </Text>
                <Text css={{ color: "$accents7", mb: "0.5rem" }}>
                  Combines organic posting expertise with strategic marketing for impactful campaigns.
                </Text>
                <Text>
                  Phone: <b>+94 726 645 529</b>
                </Text>
                <Text>
                  Email:{" "}
                  <a
                    href="mailto:shamika@example.com"
                    style={{ color: "#0070f3", textDecoration: "underline" }}
                  >
                    sales@raytronics.lk
                  </a>
                </Text>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN: Contact Form */}
          <Col xs={12} sm={8}>
            {/* 
              1) height: "100%" so it expands fully in the column.
              2) width: "100%" ensures no leftover margins.
            */}
            <Card variant="bordered" css={{ width: "100%", height: "100%", p: "2rem" }}>
              <Card.Body css={{ overflowX: "hidden" }}>
                <Text h3 css={{ mb: "1.5rem" }}>
                  Get in Touch
                </Text>
                <Row gap={1}>
                  <Col>
                    <Input
                      label="First Name"
                      placeholder="John"
                      fullWidth
                      bordered
                      clearable
                    />
                  </Col>
                  <Col>
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      fullWidth
                      bordered
                      clearable
                    />
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row gap={1}>
                  <Col>
                    <Input
                      label="Email"
                      placeholder="john@example.com"
                      type="email"
                      fullWidth
                      bordered
                      clearable
                    />
                  </Col>
                  <Col>
                    <Input
                      label="Phone"
                      placeholder="+94 777 727 527"
                      type="tel"
                      fullWidth
                      bordered
                      clearable
                    />
                  </Col>
                </Row>
                <Spacer y={1} />
                <Textarea
                  label="Message"
                  placeholder="Tell us what’s on your mind..."
                  fullWidth
                  bordered
                  minRows={4}
                />
                <Spacer y={1.5} />
                {/* Button with click handler */}
                <Button color="primary" auto onClick={handleSubmit}>
                  Send Message
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUsPage;
