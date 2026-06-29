import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import CreatePinPage from './pages/CreatePinPage';
import PinLoginPage from './pages/PinLoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import TopUpPage from './pages/TopUpPage';
import TransferPage from './pages/TransferPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';

import PageTransition from './components/PageTransition';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/create-pin' || location.pathname === '/pin-login';

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Auth routes */}
          <Route path="/" element={
            <PageTransition variant="fade">
              <LoginPage />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition variant="slideIn">
              <RegisterPage />
            </PageTransition>
          } />
          <Route path="/create-pin" element={
            <PrivateRoute>
              <PageTransition variant="slideIn">
                <CreatePinPage />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/pin-login" element={
            <PageTransition variant="slideIn">
              <PinLoginPage />
            </PageTransition>
          } />

          {/* Main routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <PageTransition variant="fade">
                <DashboardPage />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/history" element={
            <PrivateRoute>
              <PageTransition variant="fade">
                <HistoryPage />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <PageTransition variant="fade">
                <ProfilePage />
              </PageTransition>
            </PrivateRoute>
          } />

          {/* Detail routes */}
          <Route path="/topup" element={
            <PrivateRoute>
              <PageTransition variant="slideIn">
                <TopUpPage />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/transfer" element={
            <PrivateRoute>
              <PageTransition variant="slideIn">
                <TransferPage />
              </PageTransition>
            </PrivateRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {!isAuthRoute && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        maxWidth: 'var(--app-max-width)',
        margin: '0 auto',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        boxShadow: 'var(--shadow-lg)',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
