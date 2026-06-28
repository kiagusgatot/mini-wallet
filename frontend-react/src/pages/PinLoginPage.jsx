import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pinApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Numpad from '../components/Numpad';

export default function PinLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('login_email');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePinPress = (num) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
      setError('');
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  useEffect(() => {
    if (pin.length === 6 && email) {
      submitLogin();
    }
  }, [pin, email]);

  const submitLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await pinApi.loginWithPin(email, pin);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setPin(''); // Reset PIN on error
    } finally {
      setLoading(false);
    }
  };

  const switchAccount = () => {
    localStorage.removeItem('login_email');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center font-bold mb-2 text-white" style={{ fontSize: '1.75rem' }}>Mini Wallet</h1>
        <p className="text-center text-muted mb-8">
          Masukkan PIN 6 Digit Anda
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="text-center mb-6">
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>{email}</span>
            <button 
              onClick={switchAccount} 
              style={{ background: 'none', border: 'none', color: '#10b981', marginLeft: '0.5rem', cursor: 'pointer' }}>
              Ganti Akun
            </button>
          </div>

          <div className="pin-display">
            {[...Array(6)].map((_, i) => {
              const isPinFilled = i < pin.length;
              return (
                <span key={i} style={{
                  display: 'block',
                  width: '14px',
                  height: '14px',
                  minWidth: '14px',
                  minHeight: '14px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  backgroundColor: isPinFilled ? '#10b981' : 'transparent',
                  border: '2px solid #10b981',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.15s ease'
                }} />
              );
            })}
          </div>

          {loading && <p className="text-center text-muted mb-4">Memverifikasi...</p>}

          <Numpad onKeyPress={handlePinPress} onDelete={handlePinDelete} />
        </div>
      </div>
    </div>
  );
}
