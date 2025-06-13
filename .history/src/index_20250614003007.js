import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import ContextApi from './context/Context';


const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextApi>

      <ClerkProvider publishableKey={clerkPubKey}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </ContextApi>
  </React.StrictMode>
);

reportWebVitals();
