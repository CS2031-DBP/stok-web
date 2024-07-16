// RegisterForm.js
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../styles/Login.css'; // Usa el mismo archivo CSS que el de Login

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchRegister(firstName, lastName, email, password, isOwner, phoneNumber);
      localStorage.setItem('token', response.token);
      navigate('/login');
      console.log(response.token);
    } catch (error) {
      console.log(error);
      setError('Error durante el registro');
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
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="text"
                placeholder="Nombre"
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="text"
                placeholder="Apellido"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4 inputBox">
              <Form.Control
                type="text"
                placeholder="Teléfono"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                className="py-3 px-4 border-b-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <div className="d-flex justify-content-center">
                <Button
                  variant={isOwner ? "primary" : "outline-primary"}
                  className="mx-2"
                  onClick={(e) => { e.preventDefault(); setIsOwner(true); }}
                >
                  Soy dueño
                </Button>
                <Button
                  variant={!isOwner ? "primary" : "outline-primary"}
                  className="mx-2"
                  onClick={(e) => { e.preventDefault(); setIsOwner(false); }}
                >
                  No soy dueño
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full py-3">
              Registrar
            </Button>
          </Form>
          <div className="flex justify-center mt-4">
            <Button
              variant="link"
              className="text-decoration-none text-primary"
              onClick={() => navigate('/login')}
            >
              ¿Ya tienes una cuenta? Inicia sesión aquí.
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};