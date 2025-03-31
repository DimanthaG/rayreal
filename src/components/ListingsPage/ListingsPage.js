import React, { useState, useEffect, useMemo } from "react";
import { Container, Text, Input, Spacer, Row, Card, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import mockProperties from "../data/mockProperties"; // Fallback mock data

const ITEMS_PER_PAGE = 6;

// Memoized Property Card for better performance
const PropertyCard = React.memo(({ property }) => {
  const mainImage =
    property.imageUrls && property.imageUrls.length > 0
      ? property.imageUrls[0]
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

  return (
    <Card 
      key={property._id || property.id} 
      isHoverable 
      css={{ 
        maxWidth: "300px", 
        margin: "0 auto",
        width: "100%",
        '@xsMax': {
          maxWidth: "100%"
        }
      }}
    >
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`https://server-realty.vercel.app/api/proxy?url=${encodeURIComponent(mainImage)}&width=300&quality=75`}
          objectFit="cover"
          width="100%"
          height={200}
          alt={property.name}
          loading="lazy"
          fetchPriority="high"
        />
      </Card.Body>
      <Card.Footer 
        css={{ 
          justifyContent: "space-between", 
          flexWrap: "wrap",
          gap: "0.5rem",
          '@xsMax': {
            flexDirection: "column",
            alignItems: "flex-start"
          }
        }}
      >
        <Text 
          h4 
          css={{ 
            marginRight: "auto",
            fontWeight: "bold",
            '@xsMax': {
              fontSize: "$lg",
              marginRight: 0
            }
          }}
        >
          {property.name}
        </Text>
        <Text 
          h5 
          css={{ 
            color: "$gray700",
            '@xsMax': {
              fontSize: "$md"
            }
          }}
        >
          {property.price}
        </Text>
        <Button 
          color="primary" 
          auto 
          as={Link} 
          to={`/property/${property._id || property.id}`}
          css={{
            '@xsMax': {
              width: "100%"
            }
          }}
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
});

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Optimized fetch with error handling and caching
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("https://server-realty.vercel.app/api/properties", {
          headers: {
            'Cache-Control': 'max-age=300', // Cache for 5 minutes
            'Accept': 'application/json'
          }
        });
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setListings(data.properties || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings(mockProperties);
      }
    };
    fetchListings();
  }, []);

  // Filter listings based on search query (memoized for performance)
  const filteredListings = useMemo(() => {
    return listings.filter((listing) =>
      listing.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [listings, searchQuery]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  // Determine which listings to show on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentListings = filteredListings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handler to change page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container css={{
      '@xsMax': {
        padding: "$sm"
      }
    }}>
      <Text 
        h1 
        css={{ 
          textAlign: "center", 
          marginBottom: "2rem",
          '@xsMax': {
            fontSize: "$2xl",
            marginBottom: "$lg"
          }
        }}
      >
        Property Listings
      </Text>

      <Container css={{ 
        marginBottom: "2rem", 
        textAlign: "center",
        '@xsMax': {
          marginBottom: "$lg"
        }
      }}>
        <Input
          clearable
          bordered
          placeholder="Search for properties..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          css={{ 
            width: "50%",
            '@xsMax': {
              width: "100%"
            }
          }}
        />
        <Spacer y={1} />
      </Container>

      <Row 
        justify="center" 
        wrap="wrap" 
        css={{ 
          gap: "1rem",
          '@xsMax': {
            gap: "0.5rem"
          }
        }}
      >
        {currentListings.map((property) => (
          <PropertyCard key={property._id || property.id} property={property} />
        ))}
      </Row>

      <Spacer y={2} />

      {filteredListings.length > 0 && (
        <Row 
          justify="center" 
          css={{ 
            gap: "0.5rem",
            flexWrap: "wrap",
            '@xsMax': {
              gap: "0.25rem"
            }
          }}
        >
          <Button
            auto
            flat
            onPress={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            css={{
              '@xsMax': {
                minWidth: "40px",
                px: "$4"
              }
            }}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              auto
              flat={pageNum !== currentPage}
              onPress={() => handlePageChange(pageNum)}
              css={{ 
                mx: "0.25rem",
                '@xsMax': {
                  minWidth: "35px",
                  px: "$2",
                  mx: "0.125rem"
                }
              }}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            auto
            flat
            onPress={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            css={{
              '@xsMax': {
                minWidth: "40px",
                px: "$4"
              }
            }}
          >
            Next
          </Button>
        </Row>
      )}

      {filteredListings.length === 0 && (
        <Text 
          h4 
          css={{ 
            textAlign: "center", 
            marginTop: "2rem",
            '@xsMax': {
              fontSize: "$lg",
              marginTop: "$lg"
            }
          }}
        >
          No properties found matching your search criteria.
        </Text>
      )}
    </Container>
  );
};

export default ListingsPage;
