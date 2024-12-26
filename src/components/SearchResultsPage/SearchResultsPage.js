// src/components/SearchResultsPage/SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Card, Text, Input, Spacer, Button } from '@nextui-org/react';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '' });

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://your-api-url.com/properties?search=${query}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
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
        <div>
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
        </div>
      </Container>

      {/* Results Grid */}
      <Grid.Container gap={2} justify="center">
        {results.length > 0 ? (
          results.map((property) => (
            <Grid xs={12} sm={6} md={4} key={property.id}>
              <Card isHoverable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={property.imageUrl}
                    objectFit="cover"
                    width="100%"
                    height={200}
                    alt={property.name}
                  />
                </Card.Body>
                <Card.Footer>
                  <Text h4 css={{ marginRight: 'auto' }}>
                    {property.name}
                  </Text>
                  <Text h5 css={{ color: '$gray700' }}>
                    {property.price}
                  </Text>
                  <Button
                    color="primary"
                    auto
                    as="a"
                    href={`/property/${property.id}`}
                  >
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Grid>
          ))
        ) : (
          <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
            No properties found matching your search criteria.
          </Text>
        )}
      </Grid.Container>
    </Container>
  );
};

export default SearchResultsPage;
