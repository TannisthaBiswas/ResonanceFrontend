// src/pages/ResultPage.js
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Badge, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { myContext } from '../context/Context';

const ResultPage = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [replies, setReplies] = useState(0);
  const [data, setData] = useState({})
  const [contextData,setContextData] = useState({})

  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const encodedText = pathSegments[pathSegments.length - 1];

  const decodedText = decodeURIComponent(encodedText);

  const {userData}=useContext(myContext)

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'Unknown';
    const storedHandle = localStorage.getItem('handle') || 'N/A';

    setName(storedName);
    setHandle(storedHandle);

    if (userData) {
      setLikes(userData.likes || 0);
      setRetweets(userData.retweets || 0);
      setReplies(userData.replies || 0);
    }
    
    

    const callApiFun = async () => {
      try {
        const response = await axios.post("https://tweet-sentiment-prediction.onrender.com/predict", {
          text: decodedText
        });
        console.log("API Response res:", response.data);
        const value = response?.data
        setData(value)

        
        const fakeSentiments = ['Happy 😊', 'Sad 😔', 'Neutral 😐', 'Angry 😡'];
        if (value.sentiment === "positive") {
          setSentiment(fakeSentiments[0]);
        } else if (value.sentiment === "negative") {
          setSentiment(fakeSentiments[1]);
        } else {
          setSentiment(fakeSentiments[2]);
        }

      } catch (error) {
        console.log(error);
      }
    };

    callApiFun();
  }, [decodedText]);

  if (!userData) {
    return <h1>Loading...</h1>;
  }

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
