import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Numpad from '../components/Numpad';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = pin
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setError('');
      setStep(2);
    }
  };

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
    if (pin.length === 6) {
      submitLogin();
    }
  }, [pin]);

  const submitLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/login', { email, password: pin });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setPin(''); // Reset PIN on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center font-bold mb-2 text-white" style={{ fontSize: '1.75rem' }}>Mini Wallet</h1>
        <p className="text-center text-muted mb-8">
          {step === 1 ? 'Masuk untuk mengelola saldo Anda' : 'Masukkan PIN 6 Digit Anda'}
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="nama@email.com"
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary mt-4"
              disabled={!email}
            >
              Lanjut
            </motion.button>

            <p className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary font-medium" style={{ textDecoration: 'none' }}>
                Daftar
              </Link>
            </p>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="text-center mb-6">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>{email}</span>
              <button 
                onClick={() => { setStep(1); setPin(''); }} 
                style={{ background: 'none', border: 'none', color: '#10b981', marginLeft: '0.5rem', cursor: 'pointer' }}>
                Ubah
              </button>
            </div>

            <div className="pin-display">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`} />
              ))}
            </div>

            {loading && <p className="text-center text-muted mb-4">Memverifikasi...</p>}

            <Numpad onKeyPress={handlePinPress} onDelete={handlePinDelete} />
          </div>
        )}
      </div>
    </div>
  );
}
