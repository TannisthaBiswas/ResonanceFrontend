// src/pages/ResultPage.js

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Card, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { myContext } from '../context/Context';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadialBarChart, RadialBar, Legend
} from 'recharts';

const ResultPage = () => {
  const [sentiment, setSentiment] = useState('');
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [replies, setReplies] = useState(0);
  const location = useLocation();
  const { userData } = useContext(myContext);

  const pathSegments = location.pathname.split("/");
  const encodedText = pathSegments[pathSegments.length - 1];
  const decodedText = decodeURIComponent(encodedText);

  useEffect(() => {
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
        const emojiSentiments = {
          positive: '😊',
          negative: '😔',
          neutral: '😐'
        };
        const emoji = emojiSentiments[value.sentiment] || '😐';
        setSentiment(`${value.sentiment.charAt(0).toUpperCase() + value.sentiment.slice(1)} ${emoji}`);
      } catch (error) {
        console.log(error);
      }
    };

    callApiFun();
  }, [decodedText, userData]);

  if (!userData) return <h1 className="text-center mt-5">Loading...</h1>;

  const engagementData = [
    { name: 'Likes', value: likes },
    { name: 'Retweets', value: retweets },
    { name: 'Replies', value: replies }
  ];

  const colors = ['#4caf50', '#2196f3', '#ff9800'];

  const lineData = [
    { name: 'Likes', value: likes },
    { name: 'Retweets', value: retweets },
    { name: 'Replies', value: replies }
  ];

  const score = (likes * 0.4 + retweets * 0.35 + replies * 0.25).toFixed(2);

  const scoreData = [{ name: 'Engagement Score', score: parseFloat(score), fill: '#8884d8' }];

  const getFeedbackMessage = () => {
    const sentimentKey = sentiment.toLowerCase();
    if (sentimentKey.includes('positive')) {
      if (likes >= 50) return "🎉 You did great! People love your positive attitude!";
      else return "🙂 That’s not a lot of engagement. Let’s retry with a better hook!";
    } else if (sentimentKey.includes('negative')) {
      if (likes >= 30) return "🧠 Sometimes people relate to our raw emotions.";
      else return "🙃 Try keeping a positive tone next time!";
    } else {
      return "🔄 Neutral sentiment — maybe try adding some emotion?";
    }
  };

  return (
    <>
      <Navbar bg="light" className="px-3 justify-content-between shadow-sm">
        <Nav><Nav.Link as={Link} to="/form">← Back</Nav.Link></Nav>
        <Nav><Nav.Link as={Link} to="/">Home</Nav.Link></Nav>
      </Navbar>

      <Container fluid className="p-4">
        <h3 className="text-center mb-4">📊 Tweet Performance Dashboard</h3>
        <Row>
          <Col md={6}>
            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">Engagement Breakdown (Bar)</h5>
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

            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">Engagement Proportions (Pie)</h5>
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
            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">Engagement Trend (Line)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-3 shadow-sm">
              <h5 className="mb-3">Tweet Performance Score</h5>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart innerRadius="80%" outerRadius="100%" data={scoreData} startAngle={180} endAngle={0}>
                  <RadialBar minAngle={15} background clockWise dataKey="score" />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                </RadialBarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Card className="mt-4 p-4 shadow-sm">
          <h5 className="text-center mb-3">📌 Summary</h5>
          <p><strong>Predicted Sentiment:</strong> <Badge bg="info" style={{ fontSize: '1rem' }}>{sentiment}</Badge></p>
          <p><strong>Predicted Likes:</strong> {likes}</p>
          <p><strong>Predicted Retweets:</strong> {retweets}</p>
          <p><strong>Predicted Replies:</strong> {replies}</p>
          <hr />
          <p className="mt-3 text-success"><strong>AI Feedback:</strong> {getFeedbackMessage()}</p>
        </Card>
      </Container>
    </>
  );
};

export default ResultPage;
