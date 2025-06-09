// src/pages/FormPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./From.css"
import axios from 'axios';

const FormPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    author_followers: null,
    author_verified: null,
    has_hashtags: null,
    has_emojis: null,
    tweet_length: null,
    Text: ""
  })

  const [text, setText] = useState("")
  const [countFollow, setCountFollow] = useState(null)
  const [radiovalue, setRadioValue] = useState(null)

  // Handel submit Btn
  const handelSubmitbtn = async () => {
    if (!text || !countFollow || !radiovalue) return;

    // Check for # in the text
    const hasHashtag = text.includes("#") ? 1 : 0;

    // Check for emojis using regex
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/gu;
    const hasEmoji = emojiRegex.test(text) ? 1 : 0;

    const newdata = {
      author_followers: countFollow,
      author_verified: (radiovalue == 'yes') ? 1 : 0,
      has_hashtags: hasHashtag ? 1 : 0,
      has_emojis: hasEmoji,
      tweet_length: text.length,
      Text: text
    }
    setData(newdata)
    console.log("data", data);

    try {
      const response = await axios.post('https://twitter-engagement.onrender.com/predict', newdata);
      console.log("API Response:", response.data);

      // Navigate to the result page with the text
      navigate(`/result/${encodeURIComponent(text)}`);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  return (
    <div className='main-Comtainer'>
      <div className='box-ContainerFrom'>
        <h2>Fill , THis From</h2>

        <div className='wraped'>
          <p>Followers you have? Are you verified?</p>
          <label>
            <input type='radio' name='verified' value='yes' onChange={() => setRadioValue("yes")} />YES
            <input type='radio' name='verified' value='no' onChange={() => setRadioValue("no")} />NO
          </label>
        </div>
        <input type='text' placeholder='Followers count' onChange={(e) => setCountFollow(e.target.value)} />
        <input type='text' placeholder='Enter Your Tweet' onChange={(e) => setText(e.target.value)} />
        <button className='subtm' onClick={handelSubmitbtn}>Analyze</button>
      </div>
    </div>
  );
};

export default FormPage;


// {
//   "author_followers": 100,
//   "author_verified": 1,
//   "has_hashtags": 1,
//   "has_emojis": 1,
//   "tweet_length": 1260
// }