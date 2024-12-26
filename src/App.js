import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ListingsPage from './components/ListingsPage/ListingsPage';
import PropertyDetailsPage from './components/PropertyDetailsPage/PropertyDetailsPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import ContactUsPage from './components/ContactUsPage/ContactUsPage';
import FAQPage from './components/FAQPage/FAQPage';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import Footer from './components/Footer/Footer';
import AdminPage from './components/AdminPage/AdminPage';
import LoginPage from './components/LoginPage/LoginPage';
import MortgageCalculator from './components/MortgageCalculator/MortgageCalculator';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} /> 
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/MortgageCalculator" element={<MortgageCalculator />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
