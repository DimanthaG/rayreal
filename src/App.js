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
import AddPropertyPage from './components/AddPropertyPage/AddPropertyPage';
import { Navbar, Text, Button } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import image from './assets/images/RayRealty.svg';

const App = () => {
  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <a href="/">
            <Image
              width={120}
              height={120}
              src={image}
              alt="Default Image"
              css={{ objectFit: 'cover' }}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/listings">Listings</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Content>
        {/* Collapse for Mobile Screens */}
        <Navbar.Toggle showIn="xs" />
        <Navbar.Collapse>
          <Navbar.CollapseItem>
            <a href="/listings">Listings</a>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem>
            <a href="/contact">Contact</a>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem>
            <a href="/about">About</a>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
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
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
