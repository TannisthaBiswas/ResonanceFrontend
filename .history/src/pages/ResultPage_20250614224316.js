// src/pages/ResultPage.js

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';


import { Container, Row, Col, Navbar, Nav, Card, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { myContext } from '../context/Context';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar,
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
    { metric: 'Likes', value: likes },
    { metric: 'Retweets', value: retweets },
    { metric: 'Replies', value: replies }
  ];

  const colors = ['#4caf50', '#2196f3', '#ff9800'];

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
                  <XAxis dataKey="metric" />
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
                    nameKey="metric"
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
              <h5 className="mb-3">Engagement Radar Chart</h5>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart outerRadius={90} data={engagementData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar name="Engagement" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

          <Card className="p-3 mb-4 shadow-sm" style={{ position: 'relative', height: 250 }}>
  <h5 className="mb-3">Sentiment Confidence (Score Arc)</h5>
  <svg width="100%" height="200">
    <defs>
      <linearGradient id="tweetGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7b2ff7" />
        <stop offset="100%" stopColor="#00c9ff" />
      </linearGradient>
    </defs>

    <path
      d="M 60 180 A 140 140 0 0 1 340 180"
      stroke={
        score >= 70 ? '#28a745' : score < 40 ? '#dc3545' : 'url(#tweetGradient)'
      }
      strokeWidth="20"
      fill="none"
      strokeLinecap="round"
    />
  </svg>

  <div style={{
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      color: score >= 70 ? '#28a745' : score < 40 ? '#dc3545' : '#5b2fff'
    }}>
      {score}%
    </div>
    <div style={{ fontSize: '1rem', color: '#666' }}>
      Tweet Score
    </div>
  </div>
</Card>


          </Col>
        </Row>

        <Card className="mt-4 p-4 shadow-sm bg-light">
          <h3 className="text-center text-primary mb-3">💡 AI Feedback</h3>
          <p className="text-center" style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#0d6efd'
          }}>
            {getFeedbackMessage()}
          </p>
        </Card>

        <Card className="mt-4 p-4 shadow-sm">
          <h5 className="mb-3 text-center">📌 Final Metrics</h5>
          <p><strong>Sentiment:</strong> {sentiment}</p>
          <p><strong>Predicted Likes:</strong> {likes}</p>
          <p><strong>Predicted Retweets:</strong> {retweets}</p>
          <p><strong>Predicted Replies:</strong> {replies}</p>
          <p><strong>Score:</strong> {score}</p>
          
        </Card>
      </Container>
    </>
  );
};

export default ResultPage;
