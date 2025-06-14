import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Form.css";
import axios from 'axios';
import { myContext } from '../context/Context';
import { motion } from 'framer-motion';
import HeroImg from '../assets/hero.png';

const FormPage = () => {
  const { userData, setUserData } = useContext(myContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [countFollow, setCountFollow] = useState(null);
  const [radiovalue, setRadioValue] = useState(null);

  const handelSubmitbtn = async () => {
    if (!text || !countFollow || !radiovalue) return;

    const hasHashtag = text.includes("#") ? 1 : 0;

    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/gu;
    const hasEmoji = emojiRegex.test(text) ? 1 : 0;

    const cleanedText = text.replace(/[#\W_]+/g, " ").trim();

    const newdata = {
      author_followers: countFollow,
      author_verified: radiovalue === "yes" ? 1 : 0,
      has_hashtags: hasHashtag,
      has_emojis: hasEmoji,
      tweet_length: text.length,
      Text: cleanedText
    };

    setUserData({});
    navigate(`/loading?text=${encodeURIComponent(text)}`);

    try {
      const response = await axios.post('https://twitter-engagement.onrender.com/predict', newdata);
      const val = response?.data;
      const newUserContextData = {
        likes: Math.floor(val.predicted_likes),
        replies: Math.floor(val.predicted_replies),
        retweets: Math.floor(val.predicted_retweets)
      };
      setUserData(newUserContextData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'linear-gradient(-45deg, #8e44ad, #9b59b6, #d4bfff, #a5b4fc)',
        backgroundSize: '600% 600%',
        animation: 'breathingBackground 16s ease-in-out infinite',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <style>
        {`
          @keyframes breathingBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes shadowPulse {
            0% {
              box-shadow: 0 0 20px rgba(140, 80, 255, 0.2);
            }
            50% {
              box-shadow: 0 0 40px rgba(140, 80, 255, 0.5), 0 0 60px rgba(200, 160, 255, 0.3);
            }
            100% {
              box-shadow: 0 0 20px rgba(140, 80, 255, 0.2);
            }
          }
        `}
      </style>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
          maxWidth: '900px',
          width: '100%',
          animation: 'shadowPulse 16s ease-in-out infinite'
        }}
      >
        {/* Left: Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
         <h2 style={{
  fontWeight: 700,
  fontSize: '1.8rem',
  lineHeight: '2.2rem',
  color: '#111827',
  marginBottom: '0.75rem'
}}>
  Craft Tweets That Resonate.
</h2>

<p style={{
  color: '#6B7280',
  fontSize: '15px',
  lineHeight: '1.6',
  marginBottom: '2rem',
  maxWidth: '420px'
}}>
  <strong style={{ color: '#374151' }}>See the future of your tweet.</strong> <br />
  Let <strong>Resonance AI</strong> predict your Tweet's impact — likes, replies, and retweets in seconds. <br /><br />
  <em>Your next viral post starts here.</em>
</p>


          <textarea
            placeholder='Craft Your Tweet'
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '10px',
              border: '1px solid #ddd'
            }}
          ></textarea>

          <input
            type='text'
            placeholder='Followers Count'
            onChange={(e) => setCountFollow(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '10px',
              border: '1px solid #ddd'
            }}
          />

          <p style={{ marginBottom: '0.5rem' }}>Are you verified?</p>
          <label style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <span><input type='radio' name='verified' value='yes' onChange={() => setRadioValue("yes")} /> Yes</span>
            <span><input type='radio' name='verified' value='no' onChange={() => setRadioValue("no")} /> No</span>
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handelSubmitbtn}
            style={{
              background: 'linear-gradient(to right, #8f5ef7, #a77dfc)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Analyze
          </motion.button>
        </motion.div>

        {/* Right: Illustration + Address */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            flex: 1,
            backgroundColor: '#f3f4f6',
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <img
            src={HeroImg}
            alt="AI Bot"
            style={{
              width: '100%',
              maxWidth: '400px',
              marginTop: '0.8cm',
              marginBottom: '1rem',
              borderRadius: '1.25rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}
          />
          <div style={{ fontSize: '14px', color: '#4b5563', textAlign: 'center' }}>
            <p style={{ marginBottom: '0.5rem' }}>Join the Conversation</p>
            <p style={{ marginBottom: '0.5rem' }}>We’re on a mission to empower creators and analysts with tweet intelligence.
Follow us, contribute, and resonate with the future.

</p>
            <p>📧 <a href="mailto:resonance@aiinsights.dev">resonance@aiinsights.dev</a></p>
<p>📞 +1 (800) 123-4567</p>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FormPage;
