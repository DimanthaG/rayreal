import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Button, Text } from '@nextui-org/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');
      const { token } = await response.json();
      localStorage.setItem('adminToken', token);
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
