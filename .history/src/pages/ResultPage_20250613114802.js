// src/pages/ResultPage.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Card, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { myContext } from '../context/Context';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  RadialBarChart, RadialBar, Legend
} from 'recharts';

const ResultPage = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [replies, setReplies] = useState(0);
  const [contextData, setContextData] = useState({});
  const location = useLocation();
  const { userData } = useContext(myContext);

  const pathSegments = location.pathname.split("/");
  const encodedText = pathSegments[pathSegments.length - 1];
  const decodedText = decodeURIComponent(encodedText);

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
        const value = response?.data;
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
  }, [decodedText, userData]);

  if (!userData) return <h1>Loading...</h1>;

  const engagementData = [
    { name: 'Likes', value: likes },
    { name: 'Retweets', value: retweets },
    { name: 'Replies', value: replies }
  ];

  const colors = ['#4caf50', '#2196f3', '#ff9800'];

  const scatterData = [
    { x: likes, y: retweets },
    { x: retweets, y: replies },
    { x: likes, y: replies },
  ];

  const scoreData = [
    {
      name: 'Engagement Score',
      score: (likes * 0.4 + retweets * 0.35 + replies * 0.25).toFixed(2),
      fill: '#8884d8'
    }
  ];

  return (
    <>
      <Navbar bg="light" className="px-3 justify-content-between">
        <Nav><Nav.Link as={Link} to="/form">← Previous</Nav.Link></Nav>
        <Nav><Nav.Link as={Link} to="/">Home</Nav.Link></Nav>
      </Navbar>

      <Container fluid className="p-4">
        <h3 className="text-center mb-4">Tweet Performance Dashboard</h3>
        <Row>
          <Col md={6}>
            <Card className="p-3 mb-4">
              <h5>Engagement Breakdown (Bar)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-3 mb-4">
              <h5>Engagement Proportions (Pie)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={engagementData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 mb-4">
              <h5>Interaction Scatter (Likes vs RTs vs Replies)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Likes" />
                  <YAxis type="number" dataKey="y" name="Other" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Metrics" data={scatterData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-3">
              <h5>Tweet Performance Score</h5>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart innerRadius="80%" outerRadius="100%" data={scoreData} startAngle={180} endAngle={0}>
                  <RadialBar minAngle={15} background clockWise dataKey="score" />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                </RadialBarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Card className="mt-4 p-3">
          <h5 className="text-center">Summary</h5>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Social Handle:</strong> {handle}</p>
          <p><strong>Predicted Sentiment:</strong> <Badge bg="info">{sentiment}</Badge></p>
        </Card>
      </Container>
    </>
  );
};

export default ResultPage;
