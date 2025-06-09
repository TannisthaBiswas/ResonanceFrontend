// src/pages/ResultPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [sentiment, setSentiment] = useState('');

  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const encodedText = pathSegments[pathSegments.length - 1];
  const decodedText = decodeURIComponent(encodedText);

    useEffect(() => {
    console.log("Decoded text:", decodedText);

    // API call
    const callApiFun = async () => {
      try {
        const response = await axios.post("https://tweet-sentiment-prediction.onrender.com/predict", {
          text: decodedText
        });
        console.log("API Response:", response.data);
        const value = response.data;

        // Set sentiment from response if needed
        // For now, just simulate a random sentiment:
        const fakeSentiments = ['Happy 😊', 'Sad 😔', 'Neutral 😐', 'Angry 😡'];
        if(value.sentiment == "positive"){

          setSentiment(fakeSentiments[0]);
        }

        // If the API returns sentiment:
        // setSentiment(response.data.sentiment);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    callApiFun();
  }, [decodedText]);

  return (
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

        <Card bg="light" className="text-center">
          <Card.Body>
            <h5 className="mb-2">Predicted Sentiment:</h5>
            <Badge bg="info" className="p-2 fs-5">{sentiment}</Badge>
          </Card.Body>
        </Card>
      </Card>
    </Container>
  );
};

export default ResultPage;
