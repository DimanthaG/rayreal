// src/components/BlogPage/BlogPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://your-api-url.com/blogs'); // Replace with your API endpoint
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Market Insights & Blog
      </Text>
      <Grid.Container gap={2} justify="center">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid xs={12} sm={6} md={4} key={blog.id}>
              <Card isHoverable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={blog.imageUrl}
                    objectFit="cover"
                    width="100%"
                    height={200}
                    alt={blog.title}
                  />
                </Card.Body>
                <Card.Footer>
                  <Text h4>{blog.title}</Text>
                  <Text css={{ color: '$gray700', marginBottom: '1rem' }}>
                    {blog.previewText}
                  </Text>
                  <Link to={`/blog/${blog.id}`}>
                    <Button color="primary" auto>
                      Read More
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Grid>
          ))
        ) : (
          <Text h4 css={{ textAlign: 'center', marginTop: '2rem' }}>
            No blog posts available. Check back later!
          </Text>
        )}
      </Grid.Container>
    </Container>
  );
};

export default BlogPage;
