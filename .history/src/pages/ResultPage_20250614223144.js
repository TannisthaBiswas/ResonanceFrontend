// src/pages/ResultPage.js

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { myContext } from '../context/Context';
import {
  ResponsiveContainer,
  PolarAngleAxis, PolarRadiusAxis, PolarGrid, RadarChart, Radar,
  WaterfallChart, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
  PieChart, Pie, Cell
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

  const score = (likes * 0.4 + retweets * 0.35 + replies * 0.25).toFixed(2);

  // Waterfall chart data
  const scoreSteps = [
    { name: 'Base', value: 0 },
    { name: 'Likes', value: likes * 0.4 },
    { name: 'Retweets', value: retweets * 0.35 },
    { name: 'Replies', value: replies * 0.25 },
    { name: 'Total', value: parseFloat(score) }
  ];

  // Polar chart data
  const polarData = [
    { metric: 'Likes', value: likes },
    { metric: 'Retweets', value: retweets },
    { metric: 'Replies', value: replies }
  ];

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
        <h2 className="text-center mb-4">📈 Tweet Performance Summary</h2>
        <Row>
          <Col md={6}>
            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">📉 Score Contribution (Waterfall)</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={scoreSteps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">🌈 Sentiment Confidence (Mock Arc)</h5>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div style={{
                  width: '160px',
                  height: '80px',
                  background: 'linear-gradient(to right, red, orange, green)',
                  borderTopLeftRadius: '80px',
                  borderTopRightRadius: '80px',
                  textAlign: 'center',
                  paddingTop: '30px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#fff'
                }}>
                  {sentiment}
                </div>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 mb-4 shadow-sm">
              <h5 className="mb-3">🧭 Engagement Polar Breakdown</h5>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={polarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar name="Engagement" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
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
