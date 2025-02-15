import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Text,
  Button,
  Spacer,
  Card,
  Grid,
  Row
} from "@nextui-org/react";

// React Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Yet Another React Lightbox (for fullscreen images)
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import MapComponent from "./MapComponent"; // Import the map component
import mockProperties from "../data/mockProperties";
import "../styles/PropertyDetailsPage.css";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const foundProperty = mockProperties.find((item) => item.id === id);
    setProperty(foundProperty || null);
  }, [id]);

  if (!property) {
    return (
      <Container>
        <Text h3 css={{ textAlign: "center", marginTop: "2rem" }}>
          Loading property details...
        </Text>
      </Container>
    );
  }

  // React Slick settings for the main carousel (auto-scroll)
  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  // Convert property images into slides for the lightbox
  const slides = property.images.map((img) => ({ src: img }));

  return (
    <Container>
      {/* Back Button */}
      <Button
          as={RouterLink}
          to="/listings"
          size="sm"
          color="primary"
          css={{ mt: "$4" , mb : "$4", position: "inherit", left: "0", right: "0", width: "20%" }}
        >
          Back to Listings
        </Button>

      {/* Main Carousel (react-slick) */}
      <Card css={{ p: "$6" }}>
        <Slider {...mainSliderSettings}>
          {property.images.map((url, index) => (
            <div
              key={index}
              onClick={() => {
                // Open Lightbox at the clicked slide
                setCurrentSlide(index);
                setLightboxOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={url}
                alt={`Property image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </Slider>
      </Card>

      <Spacer y={2} />

      {/* Airbnb-ish Header: Title & Address */}
      <Row justify="space-between" align="center">
        <div>
          <Text h1 css={{ mb: "$2", fontWeight: "bold" }}>
            {property.name}
          </Text>
          <Text css={{ color: "$accents7" }}>
            {property.address}
          </Text>
        </div>
      </Row>

      <Spacer y={2} />
      <hr />

      {/* MAIN CONTENT GRID */}
      <Grid.Container gap={2} css={{ mt: "$8" }}>
        {/* Left column: Description & Property Highlights */}
        <Grid xs={12} sm={8} direction="column">
          <Text h3 css={{ mb: "$5" }}>
            Property Description
          </Text>
          <Text css={{ lineHeight: "1.5", mb: "$5" }}>
            {property.description}
          </Text>

          <Row wrap="wrap" css={{ gap: "$10", mb: "$8" }}>
            <Text>
              <b>Bedrooms:</b> {property.bedrooms || "3"}
            </Text>
            <Text>
              <b>Bathrooms:</b> {property.bathrooms || "2"}
            </Text>
            <Text>
              <b>Property Type:</b> {property.type || "House"}
            </Text>
            <Text>
              <b>Lot Size:</b> {property.lotSize || "2,500 sqft"}
            </Text>
          </Row>
        </Grid>

        {/* Right column: Price & CTA */}
        <Grid xs={12} sm={4}>
          <Card variant="bordered" css={{ p: "$8", position: "sticky", top: "80px" }}>
            <Text h3 css={{ mb: "$1" }}>
              Listing Price: {property.price}
            </Text>
            <Text small css={{ color: "$accents7", mb: "$5" }}>
              (Negotiable)
            </Text>
            <Text css={{ mb: "$10" }}>
              Interested in this property? Schedule a visit to experience it firsthand.
            </Text>
            <Button color="primary" auto as={RouterLink} to="/contact" css={{ mt: "$2" }}>
              Schedule a Visit
            </Button>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={4} />

      {/* Map Section */}
      <Text h3 css={{ mb: "$5" }}>
        Location on Map
      </Text>
      <MapComponent
        latitude={property.latitude || 6.9271}  // Default to Colombo, Sri Lanka coordinates if not provided
        longitude={property.longitude || 79.8612}
        address={property.address}
      />

      {/* Lightbox (fullscreen, dimmed background) */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentSlide}
          onIndexChange={setCurrentSlide}
        />
      )}
    </Container>
  );
};

export default PropertyDetailsPage;
