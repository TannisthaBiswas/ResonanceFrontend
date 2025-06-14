// src/pages/FormPage.js

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Form.css";
import axios from 'axios';
import { myContext } from '../context/Context';
import emailImage from '../assets/email-illustration.png';


const FormPage1 = () => {
  const { userData, setUserData } = useContext(myContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [countFollow, setCountFollow] = useState("");
  const [radiovalue, setRadioValue] = useState("");

  const handleSubmit = async () => {
    if (!text || !countFollow || !radiovalue) return;

    const hasHashtag = text.includes("#") ? 1 : 0;
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/gu;
    const hasEmoji = emojiRegex.test(text) ? 1 : 0;
    const cleanedText = text.replace(/[#\W_]+/g, " ").trim();

    const newdata = {
      author_followers: Number(countFollow),
      author_verified: radiovalue === 'yes' ? 1 : 0,
      has_hashtags: hasHashtag,
      has_emojis: hasEmoji,
      tweet_length: text.length,
      Text: cleanedText
    };

    try {
      navigate('/loading');
      const response = await axios.post('https://twitter-engagement.onrender.com/predict', newdata);
      const val = response.data;
      setUserData({
        likes: Math.floor(val.predicted_likes),
        replies: Math.floor(val.predicted_replies),
        retweets: Math.floor(val.predicted_retweets)
      });
      navigate(`/result/${encodeURIComponent(text)}`);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-left">
          <h1>Let’s talk</h1>
          <p>
            To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.
          </p>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />

          <textarea
            placeholder="Enter Your Tweet"
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="number"
            placeholder="Followers Count"
            onChange={(e) => setCountFollow(e.target.value)}
          />

          <div className="radio-group">
            <span>Are you verified?</span>
            <label>
              <input type="radio" name="verified" value="yes" onChange={() => setRadioValue("yes")} />
              Yes
            </label>
            <label>
              <input type="radio" name="verified" value="no" onChange={() => setRadioValue("no")} />
              No
            </label>
          </div>

          <button onClick={handleSubmit}>Send Message</button>
        </div>

        <div className="form-right">
          <img src={emailImage} alt="Email Illustration" />

          <div className="contact-info">
            <p>📍 151 New Park Ave, Hartford, CT 06106, United States</p>
            <p>📞 +1 (203) 302-9545</p>
            <p>✉️ contactus@inveritasoft.com</p>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage1;
