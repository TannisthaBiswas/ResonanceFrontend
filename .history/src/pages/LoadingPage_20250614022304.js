// src/pages/LoadingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LoadingPage.css';

const loadingTexts = [
  'Thinking...',
  'Analyzing Data...',
  'Interpreting Sentiment...',
  'Almost there...'
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 1500);

    const navTimer = setTimeout(() => {
      navigate('/result');
    }, 20000);

    return () => {
      clearInterval(textTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center loading-container">
      <div className="lottie-wrapper">
        <DotLottieReact
          src="https://lottie.host/7ebb2da4-f0b5-41ad-8371-465fb7bb62bb/zSnXzlWtOo.lottie"
          loop
          autoplay
        />
          <DotLottieReact
      src="https://lottie.host/6e4d4031-1566-4bfa-a14b-9aba46d7f6ba/qm7iT5qO5d.lottie"
      loop
      autoplay
    />
      </div>
      <h4 className="mt-4 animated-text">{loadingTexts[textIndex]}</h4>
    </Container>
  );
};

export default LoadingPage;
