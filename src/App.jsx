import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import Spinner from './components/Spinner';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyPage from './pages/PropertyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const PropertyEditor = lazy(() => import('./pages/admin/PropertyEditor'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RequireAdmin({ children }) {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Spinner full />;
  if (!isAdmin) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

function PublicShell({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner full />}>
        <Routes>
          <Route path="/" element={<PublicShell><HomePage /></PublicShell>} />
          <Route path="/listings" element={<PublicShell><ListingsPage /></PublicShell>} />
          <Route path="/property/:refId/:slug?" element={<PublicShell><PropertyPage /></PublicShell>} />
          <Route path="/about" element={<PublicShell><AboutPage /></PublicShell>} />
          <Route path="/contact" element={<PublicShell><ContactPage /></PublicShell>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={<RequireAdmin><AdminLayout /></RequireAdmin>}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="properties/new" element={<PropertyEditor />} />
            <Route path="properties/:refId" element={<PropertyEditor />} />
          </Route>
          {/* old URLs */}
          <Route path="/search" element={<Navigate to="/listings" replace />} />
          <Route path="/add-property" element={<Navigate to="/admin/properties/new" replace />} />
          <Route path="*" element={<PublicShell><NotFoundPage /></PublicShell>} />
        </Routes>
      </Suspense>
    </>
  );
}
