import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { config } from './config';
import './index.css';

const Router = config.memoryRouter ? MemoryRouter : config.hashRouter ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
);
