import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { NextUIProvider } from '@nextui-org/react';
import App from './App';
import './index.css';
import { Analytics } from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById('root')); // Initialize React root
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <Analytics/>
    </NextUIProvider>
  </React.StrictMode>
);
