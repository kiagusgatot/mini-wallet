import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = form.name && form.username && form.email && form.password.length === 6;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setError('');
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.phone.trim()) delete payload.phone;
      
      const res = await api.post('/register', payload);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="text-center font-bold mb-2 text-white" style={{ fontSize: '1.5rem' }}>Buat Akun</h1>
      <p className="text-center text-muted mb-6" style={{ fontSize: '0.9rem' }}>Daftar untuk mulai bertransaksi</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="form-group mb-1">
          <input type="text" name="name" className="form-input" placeholder="Nama Lengkap" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group mb-1">
          <input type="text" name="username" className="form-input" placeholder="Username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group mb-1">
          <input type="email" name="email" className="form-input" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group mb-1">
          <input type="text" name="phone" className="form-input" placeholder="Nomor HP (Opsional)" value={form.phone} onChange={handleChange} />
        </div>
        <div className="form-group mb-1">
          <input type="password" name="password" maxLength={6} pattern="\d*" className="form-input" placeholder="Buat PIN 6 Digit" value={form.password} onChange={handleChange} required />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading || !isValid}
        >
          {loading ? 'Memproses...' : 'Daftar Sekarang'}
        </motion.button>
      </form>

      <p className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
        Sudah punya akun?{' '}
        <Link to="/" className="text-primary font-medium" style={{ textDecoration: 'none' }}>
          Masuk
        </Link>
      </p>
    </div>
  );
}
