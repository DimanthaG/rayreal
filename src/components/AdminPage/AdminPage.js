import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, Card, Grid, Text } from "@nextui-org/react";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6; // number of properties to display per page

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchProperties(token);
    }
  }, [navigate]);

  const fetchProperties = async (token) => {
    try {
      const response = await fetch("https://server-realty.vercel.app/api/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      setProperties(data.properties);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`https://server-realty.vercel.app/api/properties/${propertyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete property");
      setProperties((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Calculate pagination
  const pageCount = Math.ceil(properties.length / propertiesPerPage);

  // Get current page's slice of properties
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  // Generate an array of pages [1, 2, 3, ...]
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Container css={{ display: "flex", flexDirection: "column" }}>
      <Text h2 css={{ marginBottom: "1rem" }}>
        Manage Properties
      </Text>

      <Button onClick={() => navigate("/add-property")} css={{ marginBottom: "1rem" }}>
        Add New Property
      </Button>

      <Grid.Container
        gap={2}
        justify="flex-start"
        css={{ display: "flex", flexWrap: "wrap" }}
      >
        {currentProperties.map((property) => {
          // If there's an image, use the first one. Otherwise, use a placeholder.
          const mainImage =
            property.imageUrls && property.imageUrls.length > 0
              ? property.imageUrls[0]
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

          return (
            // xs={4} makes each card span 4 columns (3 per row)
            <Grid xs={4} sm={4} md={4} lg={4} xl={4} key={property._id || property.id}>
              <Card hoverable css={{ w: "100%", h: "auto" }}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={`https://server-realty.vercel.app/api/proxy?url=${encodeURIComponent(
                      mainImage
                    )}`}
                    objectFit="cover"
                    width="100%"
                    height={180}
                    alt={property.name}
                  />
                </Card.Body>

                <Card.Footer
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Text h4 css={{ mb: 0 }}>
                    {property.name}
                  </Text>
                  <Text b size={14} css={{ color: "$accents7", mb: "0.5rem" }}>
                    {property.price}
                  </Text>

                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    <Button auto color="primary" as={Link} to={`/property/${property._id || property.id}`}>
                      View Details
                    </Button>
                    <Button auto color="warning" as={Link} to={`/editproperty/${property._id || property.id}`}>
                      Edit
                    </Button>
                    <Button auto color="error" onClick={() => handleDelete(property._id || property.id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>

      {/* Pagination Buttons */}
      {pageCount > 1 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Button auto disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              auto
              color={page === currentPage ? "primary" : "default"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button auto disabled={currentPage === pageCount} onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AdminPage;
