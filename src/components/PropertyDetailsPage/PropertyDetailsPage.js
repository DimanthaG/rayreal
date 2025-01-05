import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Link, Container, Text, Button, Spacer } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import mockProperties from "../data/mockProperties"; // Import mock data
import "../styles/PropertyDetailsPage.css"; // Import custom styles

const PropertyDetailsPage = () => {
  const { id } = useParams(); // Property ID from the URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = () => {
      const foundProperty = mockProperties.find((item) => item.id === id);
      setProperty(foundProperty || null);
    };
    fetchProperty();
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

  return (
    <Container className="property-details-page">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Button auto flat as={RouterLink} to="/listings">
            Back to Listings
          </Button>
        </div>
        <Spacer y={1} />
        {/* Carousel */}
      <div className="carousel-section">
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {property.images.map((url, index) => (
            <div key={index} className="carousel-image-container">
              <img src={url} alt={`Property image ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Property Details */}
      <div className="text-section">
        <Text h1 className="property-title">{property.name}</Text>
        <Text className="price">Price: {property.price} (Negotiable)</Text>
        <Text className="description">{property.description}</Text>
        <Text className="address">
          <b>Address:</b> {property.address}
        </Text>
        <Button
          className="schedule-button"
          as="a"
          href="/contact"
          to="/contact"
        >
          Schedule a Visit
        </Button>
      </div>

      <Spacer y={2} />
      {/* Location Section */}
      
    </Container>
  );
};

export default PropertyDetailsPage;
