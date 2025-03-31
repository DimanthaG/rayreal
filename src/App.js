import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Text, Button, Image } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import image from './assets/images/RayRealty.svg';
import './styles/animations.css';

// Import all page components
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
import Editproperty from './components/EditPropertyPage/EditPropertyPage';
import AgentsProfiles from './components/AgentProfilesPage/AgentProfilesPage';

// Animated page wrapper component
const AnimatedPage = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar 
        isBordered 
        variant="floating"
        css={{
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
          }
        }}
      >
        <Navbar.Brand>
          <a href="/" className="hover-scale">
            <Image
              width={120}
              height={120}
              src={image}
              alt="RayRealty Logo"
              css={{ 
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Content 
          hideIn="xs" 
          css={{
            '& a': {
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#4169E1'
              }
            }
          }}
        >
          <Navbar.Link href="/about">About Us</Navbar.Link>
          <Navbar.Link href="/listings">Listings</Navbar.Link>
          <Navbar.Link href="/agents">Agents</Navbar.Link>
          <Navbar.Link href="/contact">Contact Us</Navbar.Link>
        </Navbar.Content>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Collapse>
          {[
            { href: '/listings', text: 'Listings' },
            { href: '/contact', text: 'Contact' },
            { href: '/agents', text: 'Agents' }
          ].map((item, index) => (
            <Navbar.CollapseItem key={item.href}>
              <a 
                href={item.href}
                className="transition-all"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.text}
              </a>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/listings" element={<AnimatedPage><ListingsPage /></AnimatedPage>} />
          <Route path="/property/:id" element={<AnimatedPage><PropertyDetailsPage /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><AboutUsPage /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><ContactUsPage /></AnimatedPage>} />
          <Route path="/faq" element={<AnimatedPage><FAQPage /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          <Route path="/admin" element={<AnimatedPage><AdminPage /></AnimatedPage>} />
          <Route path="/search" element={<AnimatedPage><SearchResultsPage /></AnimatedPage>} />
          <Route path="/MortgageCalculator" element={<AnimatedPage><MortgageCalculator /></AnimatedPage>} />
          <Route path="/add-property" element={<AnimatedPage><AddPropertyPage /></AnimatedPage>} />
          <Route path="/agents" element={<AnimatedPage><AgentsProfiles /></AnimatedPage>} />
          <Route path="/editproperty/:id" element={<AnimatedPage><Editproperty /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
