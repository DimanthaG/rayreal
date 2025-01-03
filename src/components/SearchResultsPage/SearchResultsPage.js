// src/components/SearchResultsPage/SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Card, Text, Input, Spacer, Button, Row, Col } from '@nextui-org/react';
import mockProperties from "../data/mockProperties"; // Import mock data

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '' });

  useEffect(() => {
    const filterProperties = () => {
      let filtered = mockProperties;

      // Apply search query filter
      if (query) {
        filtered = filtered.filter((property) =>
          property.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply price range filter
      if (filters.minPrice) {
        filtered = filtered.filter((property) =>
          parseInt(property.price.replace(/[^0-9]/g, '')) >= parseInt(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((property) =>
          parseInt(property.price.replace(/[^0-9]/g, '')) <= parseInt(filters.maxPrice)
        );
      }

      setResults(filtered);
    };

    filterProperties();
  }, [query, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    setQuery(searchParams.get('q') || query);
  };

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Search Results
      </Text>

      {/* Search Bar and Filters */}
      <Container css={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Input
          clearable
          bordered
          placeholder="Search for properties..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          css={{ width: '50%' }}
        />
        <Spacer y={1} />
        <Row justify="center">
          <Input
            clearable
            bordered
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            css={{ width: '20%', marginRight: '1rem' }}
          />
          <Input
            clearable
            bordered
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            css={{ width: '20%' }}
          />
          <Spacer x={1} />
          <Button color="primary" auto onClick={handleSearch}>
            Apply Filters
          </Button>
        </Row>
      </Container>

      {/* Results Grid */}
      <Row justify="center" wrap="wrap" css={{ gap: '1rem' }}>
        {results.length > 0 ? (
          results.map((property) => (
            <Col span={3} key={property.id} css={{ maxWidth: '300px' }}>
              <Card isHoverable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={property.images[0] || '/path-to-placeholder-image.jpg'}
                    objectFit="cover"
                    width="100%"
                    height={200}
                    alt={property.name}
                  />
                </Card.Body>
                <Card.Footer css={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text h4 css={{ marginBottom: '0.5rem' }}>
                    {property.name}
                  </Text>
                  <Text h5 css={{ marginBottom: '0.5rem', color: '$gray700' }}>
                    {property.price}
                  </Text>
                  <Button
                    color="primary"
                    auto
                    as="a"
                    href={`/property/${property.id}`}
                    css={{ alignSelf: 'center', marginTop: '0.5rem' }}
                  >
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
            No properties found matching your search criteria.
          </Text>
        )}
      </Row>
    </Container>
  );
};

export default SearchResultsPage;
