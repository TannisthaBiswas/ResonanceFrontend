// src/pages/FormPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Navbar, Nav } from 'react-bootstrap';

const FormPage = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('handle', socialHandle);
    navigate('/loading');
  };

  return (
    <>
      <Navbar bg="light" className="justify-content-end px-3">
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="mt-5" style={{ maxWidth: '500px' }}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Enter User Details</h3>
          <Form onSubmit={handleAnalyze}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Person's Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formHandle">
              <Form.Label>Social Media Handle</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="@username / profile link"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Analyze
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default FormPage;
