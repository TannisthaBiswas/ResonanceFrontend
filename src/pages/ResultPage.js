// src/pages/ResultPage.js
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResultPage = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [replies, setReplies] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'Unknown';
    const storedHandle = localStorage.getItem('handle') || 'N/A';

    setName(storedName);
    setHandle(storedHandle);

    // Random sentiment
    const fakeSentiments = ['Happy 😊', 'Sad 😔', 'Neutral 😐', 'Angry 😡'];
    const random = Math.floor(Math.random() * fakeSentiments.length);
    setSentiment(fakeSentiments[random]);

    // Dummy predictions for likes, retweets, replies
    setLikes(Math.floor(Math.random() * 1000));
    setRetweets(Math.floor(Math.random() * 500));
    setReplies(Math.floor(Math.random() * 300));
  }, []);

  return (
    <>
      {/* Navbar with "Previous" on the left and "Home" on the right */}
      <Navbar bg="light" className="px-3 justify-content-between">
        <Nav>
          <Nav.Link as={Link} to="/form">← Previous</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="mt-5" style={{ maxWidth: '600px' }}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Sentiment Analysis Result</h3>

          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-1">Name:</h5>
              <p>{name}</p>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-1">Social Handle:</h5>
              <p>{handle}</p>
            </Card.Body>
          </Card>

          <Card className="mb-3 text-center">
            <Card.Body>
              <h5 className="mb-2">Predicted Likes:</h5>
              <Badge bg="success" className="p-2 fs-5">{likes}</Badge>
            </Card.Body>
          </Card>

          <Card className="mb-3 text-center">
            <Card.Body>
              <h5 className="mb-2">Predicted Retweets:</h5>
              <Badge bg="primary" className="p-2 fs-5">{retweets}</Badge>
            </Card.Body>
          </Card>

          <Card className="mb-3 text-center">
            <Card.Body>
              <h5 className="mb-2">Predicted Replies:</h5>
              <Badge bg="warning" className="p-2 fs-5 text-dark">{replies}</Badge>
            </Card.Body>
          </Card>

          <Card bg="light" className="text-center">
            <Card.Body>
              <h5 className="mb-2">Predicted Sentiment:</h5>
              <Badge bg="info" className="p-2 fs-5">{sentiment}</Badge>
            </Card.Body>
          </Card>
        </Card>
      </Container>
    </>
  );
};

export default ResultPage;
