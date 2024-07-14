import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../styles/Login.css';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchLogin(username, password);
      localStorage.setItem('token', response.token);
      console.log(response.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Error durante el inicio de sesión');
    }
  };

  return (
    <Container className="signin-container flex items-center justify-center h-screen">
      <Row className="box p-5 rounded shadow-lg bg-white">
        <Col>
          <h2 className="text-7xl text-center mb-5 text-[#2c3e50]">ST★K</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="email"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full py-3">
              Sign In
            </Button>
          </Form>
          <div className="flex justify-center mt-4">
            <Button
              variant="link"
              className="text-decoration-none text-primary"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Register
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};