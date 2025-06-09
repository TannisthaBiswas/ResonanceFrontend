// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Container, Navbar, Nav, Button, Row, Col, Image } from 'react-bootstrap';
import heroImage from '../assets/hero.jpg'; // Adjust path based on where you place the image

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/form');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">🧠 Resonance AI</Navbar.Brand>
          <Nav className="ms-auto">
            <SignedOut>
              <SignInButton>
                <Button variant="outline-primary" className="me-2">Login</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="primary">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Nav>
        </Container>
      </Navbar>

      {/* Body Content */}
      <Container className="text-center mt-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-5 fw-bold">Understand People's Sentiments with Resonance AI</h1>
            <p className="lead mt-3">
              We analyze data from social media to decode what people feel — in real-time.
            </p>
            <Button variant="success" size="lg" className="mt-4" onClick={handleGetStarted}>
              Get Started
            </Button>
          </Col>
          <Col md={6}>
            <Image 
              src={heroImage} 
              alt="AI analyzing emotions" 
              fluid 
              rounded 
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
