import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { pinApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Login with Email + Password
      const res = await api.post('/login', { email, password });
      login(res.data.token);
      localStorage.setItem('login_email', email); // Save for PIN login later

      // Check PIN status
      const statusRes = await pinApi.getPinStatus();
      if (statusRes.data.has_pin) {
        navigate('/pin-login');
      } else {
        navigate('/create-pin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center font-bold mb-2 text-white" style={{ fontSize: '1.75rem' }}>Mini Wallet</h1>
        <p className="text-center text-muted mb-8">
          Masuk ke akun Anda
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={submitLogin}>
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
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Masukkan password"
              required
            />
          </div>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary mt-4"
            disabled={!email || !password || loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
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
