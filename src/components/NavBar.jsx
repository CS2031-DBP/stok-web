import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-[#2c3e50]">
      <Container>
        <Navbar.Brand href="/" className="text-white">ST★K</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link href="/login" className="text-white">Login</Nav.Link>
                <Nav.Link href="/register" className="text-white">Register</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout} className="text-white cursor-pointer">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;