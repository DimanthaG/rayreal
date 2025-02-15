import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Button, Text } from '@nextui-org/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://server-realty.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      // Extract accessToken from the response
      const { accessToken } = await response.json();
      localStorage.setItem('adminToken', accessToken);
      navigate('/admin');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', color: 'var(--primary-color)' }}>
        Admin Login
      </Text>
      <Input
        clearable
        label="Username"
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        css={{ marginBottom: '1rem' }}
      />
      <Input
        clearable
        type="password"
        label="Password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        css={{ marginBottom: '1rem' }}
      />
      <Button onClick={handleLogin} color="primary">
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
