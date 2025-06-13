import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { FaRobot, FaChartPie, FaFileExport, FaBolt, FaGlobe, FaShieldAlt, FaSearch, FaBrain, FaLightbulb, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/form');
  };

  const cardStyle = {
    background: 'linear-gradient(135deg, #f8f9ff, #e0f7fa)',
    border: '1px solid #d2e3f0',
    borderRadius: '1rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const cardData = [
    {
      icon: <FaRobot size={40} className="mb-3" />, title: 'AI-Powered Predictions',
      text: 'Our sentiment engine uses cutting-edge NLP to detect emotions in real-time.', color: 'text-primary'
    },
    {
      icon: <FaChartPie size={40} className="mb-3" />, title: 'Interactive Visuals',
      text: 'Visualize engagement with intuitive, beautiful charts and dashboards.', color: 'text-success'
    },
    {
      icon: <FaFileExport size={40} className="mb-3" />, title: 'Export Reports',
      text: 'Export your analytics as PDF or PNG to share insights with anyone.', color: 'text-danger'
    },
    {
      icon: <FaBolt size={40} className="mb-3" />, title: 'Real-Time Processing',
      text: 'Get instant insights as conversations happen. Monitor sentiment changes across platforms.', color: 'text-warning'
    },
    {
      icon: <FaGlobe size={40} className="mb-3" />, title: 'Multi-Platform Coverage',
      text: 'Analyze sentiment across Twitter, Facebook, Instagram, LinkedIn, and more.', color: 'text-info'
    },
    {
      icon: <FaShieldAlt size={40} className="mb-3" />, title: 'Privacy Protected',
      text: 'Enterprise-grade security ensures your data remains confidential and compliant.', color: 'text-secondary'
    }
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            <span style={{
              background: 'linear-gradient(to right, #7b2ff7, #00c9ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Resonance AI
            </span>
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center gap-2">
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

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f8f9ff, #e0f7fa)',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <Container>
          <motion.h1
            className="display-4 fw-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Understand People's{' '}
            <span style={{
              background: 'linear-gradient(to right, #5b2fff, #8e2de2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Sentiments
            </span>{' '}with <span className="text-dark">Resonance AI</span>
          </motion.h1>

          <motion.p
            className="lead mt-4 text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We analyze data from social media to decode what people feel — in real-time. Transform raw conversations into actionable insights.
          </motion.p>

          <motion.div
            className="mt-5 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
              style={{
                background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '50px',
                fontWeight: '500'
              }}
            >
              Start Analyzing →
            </Button>
          </motion.div>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-2">Why Choose Resonance AI?</h2>
        <p className="text-center text-muted mb-5">
          Our cutting-edge technology transforms social media noise into clear, actionable insights.
        </p>
        <Row className="g-4">
          {cardData.map((item, index) => (
            <Col md={4} key={index} className="d-flex align-items-stretch">
              <motion.div
                className="w-100 h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 12px 25px rgba(128, 0, 255, 0.2)'
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ borderRadius: '1rem' }}
              >
                <Card
                  className="p-4 text-center border-0 h-100"
                  style={cardStyle}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`${item.color}`}
                  >
                    {item.icon}
                  </motion.div>
                  <h5 className="fw-semibold mt-2">{item.title}</h5>
                  <p className="text-muted">{item.text}</p>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>


     {/* How It Works Section */}
<Container className="text-center my-5">
  <h2 className="fw-bold">How It Works</h2>
  <p className="text-muted">
    From raw social media data to actionable insights in four simple steps
  </p>

  <Row className="mt-5 g-4 justify-content-center align-items-end">
    {[
      {
        icon: <FaSearch size={36} />,
        title: 'Data Collection',
        text: 'We gather social media conversations from multiple platforms in real-time, ensuring comprehensive coverage.'
      },
      {
        icon: <FaBrain size={36} />,
        title: 'AI Processing',
        text: 'Our advanced AI algorithms analyze text, context, and emotions to understand true sentiment behind each message.'
      },
      {
        icon: <FaChartBar size={36} />,
        title: 'Visual Analytics',
        text: 'Transform complex data into clear, actionable dashboards with trends, patterns, and key insights.'
      },
      {
        icon: <FaLightbulb size={36} />,
        title: 'Strategic Insights',
        text: 'Receive recommendations and insights that help you make informed decisions based on public sentiment.'
      }
    ].map((step, index) => (
      <Col md={3} key={index} className="text-center position-relative">
        {/* Numbered step badge */}
        <div
          style={{
            position: 'absolute',
            top: '-48px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            borderRadius: '50%',
            width: 48,
            height: 48,
            border: '3px solid #cbdfff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontWeight: 600,
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#377dff',
            marginBottom: '16px'
          }}
        >
          {index + 1}
        </div>

        {/* Main icon */}
        <div className="mb-3 mt-5">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(to right, #5b2fff, #8e2de2)',
              color: 'white'
            }}
          >
            {step.icon}
          </div>
        </div>

        {/* Gradient line under icon */}
        <div
          style={{
            height: 2,
            background: 'linear-gradient(to right, #a78bfa, #7dd3fc)',
            margin: '16px auto',
            width: '100%'
          }}
        />

        <h6 className="fw-bold mb-2">{step.title}</h6>
        <p className="text-muted small">{step.text}</p>
      </Col>
    ))}
  </Row>
</Container>



      {/* Trusted by Industry Leaders */}
      <div style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)', color: 'white', padding: '60px 20px' }}>
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Trusted by Industry Leaders</h2>
          <p className="mb-5">Our platform processes millions of conversations daily with unmatched accuracy</p>
          <Row className="g-4">
            <Col md={3}><h3 className="fw-bold">10M+</h3><p className="mb-0">Social Posts Analyzed Daily</p></Col>
            <Col md={3}><h3 className="fw-bold">99.2%</h3><p className="mb-0">Accuracy Rate</p></Col>
            <Col md={3}><h3 className="fw-bold">500+</h3><p className="mb-0">Enterprise Clients</p></Col>
            <Col md={3}><h3 className="fw-bold">24/7</h3><p className="mb-0">Real-Time Monitoring</p></Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="text-center py-5">
        <h2 className="fw-bold mb-3">Ready to Understand Your Audience?</h2>
        <p className="text-muted mb-4">Join hundreds of companies already using Resonance AI to make data-driven decisions based on real human sentiment.</p>
        <Button
          size="lg"
          style={{
            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '50px',
            fontWeight: '500'
          }}
          onClick={handleGetStarted}
        >
          Start Free Trial →
        </Button>
        <p className="text-muted mt-3 small">No credit card required • 14-day free trial • Cancel anytime</p>
      </Container>

      {/* Footer */}
      <footer className="bg-light text-center py-3 border-top">
        <small className="text-muted">© 2025 Resonance AI. All rights reserved.</small>
      </footer>
    </>
  );
};

export default HomePage;