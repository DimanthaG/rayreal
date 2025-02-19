import React, { useState, useEffect, useMemo } from "react";
import { Container, Text, Input, Spacer, Row, Card, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import mockProperties from "../data/mockProperties"; // Fallback mock data

const ITEMS_PER_PAGE = 6;

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch listings from API or fallback to mock data
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("https://server-realty.vercel.app/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        // Assume API returns { properties: [...] }
        setListings(data.properties);
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
    <Container>
      <Text h1 css={{ textAlign: "center", marginBottom: "2rem" }}>
        Property Listings
      </Text>

      {/* Search Bar */}
      <Container css={{ marginBottom: "2rem", textAlign: "center" }}>
        <Input
          clearable
          bordered
          placeholder="Search for properties..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          css={{ width: "50%" }}
        />
        <Spacer y={1} />
      </Container>

      {/* Listings Grid */}
      <Row justify="center" wrap="wrap" css={{ gap: "1rem" }}>
        {currentListings.map((property, index) => {
          // Use the first image from imageUrls; fallback if empty
          const mainImage =
            property.imageUrls && property.imageUrls.length > 0
              ? property.imageUrls[0]
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

          return (
            <Card key={property._id || property.id} isHoverable css={{ maxWidth: "300px", margin: "0 auto" }}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={`https://server-realty.vercel.app/api/proxy?url=${encodeURIComponent(
                    mainImage
                  )}`}                 
                  objectFit="cover"
                  width="100%"
                  height={200}
                  alt={property.name}
                  loading="lazy"
                />
              </Card.Body>
              <Card.Footer css={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                <Text h4 css={{ marginRight: "auto", fontWeight: "bold" }}>
                  {property.name}
                </Text>
                <Text h5 css={{ color: "$gray700" }}>
                  {property.price}
                </Text>
                <Button color="primary" auto as={Link} to={`/property/${property._id || property.id}`}>
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Row>

      <Spacer y={2} />

      {/* Pagination Controls */}
      {filteredListings.length > 0 && (
        <Row justify="center" css={{ gap: "0.5rem" }}>
          <Button
            auto
            flat
            onPress={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              auto
              flat={pageNum !== currentPage}
              onPress={() => handlePageChange(pageNum)}
              css={{ mx: "0.25rem" }}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            auto
            flat
            onPress={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Row>
      )}

      {/* No Results Message */}
      {filteredListings.length === 0 && (
        <Text h4 css={{ textAlign: "center", marginTop: "2rem" }}>
          No properties found matching your search criteria.
        </Text>
      )}
    </Container>
  );
};

export default ListingsPage;
