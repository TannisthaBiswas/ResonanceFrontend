// src/pages/LoadingPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="primary" role="status" />
      <h4 className="mt-3">Analyzing Sentiments...</h4>
    </Container>
  );
};

export default LoadingPage;
