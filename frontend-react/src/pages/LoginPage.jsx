import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pinApi } from '../services/api';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Check PIN status
      const res = await pinApi.getPinStatus(email);
      
      // Valid email, store in localStorage
      localStorage.setItem('login_email', email);
      
      if (res.data.has_pin) {
        navigate('/pin-login');
      } else {
        navigate('/create-pin');
      }
    } catch (err) {
      setError(err.message || 'Email tidak terdaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center font-bold mb-2 text-white" style={{ fontSize: '1.75rem' }}>Mini Wallet</h1>
        <p className="text-center text-muted mb-8">
          Masukkan email untuk melanjutkan
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={submitEmail}>
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
            disabled={!email || loading}
          >
            {loading ? 'Memproses...' : 'Lanjut'}
          </motion.button>

          <p className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary font-medium" style={{ textDecoration: 'none' }}>
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
