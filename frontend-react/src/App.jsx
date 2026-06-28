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
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/create-pin" element={<PrivateRoute><CreatePinPage /></PrivateRoute>} />
          <Route path="/pin-login" element={<PinLoginPage />} />
          
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/topup" element={<PrivateRoute><TopUpPage /></PrivateRoute>} />
          <Route path="/transfer" element={<PrivateRoute><TransferPage /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          
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
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
