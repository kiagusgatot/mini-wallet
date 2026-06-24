import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Nama tidak boleh kosong.';
  if (!form.username.trim()) errors.username = 'Username tidak boleh kosong.';
  if (!form.email.trim()) {
    errors.email = 'Email tidak boleh kosong.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.';
  }
  if (!form.password) {
    errors.password = 'Password tidak boleh kosong.';
  } else if (form.password.length < 8) {
    errors.password = 'Password minimal 8 karakter.';
  }
  return errors;
}

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
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const errors = validateForm(form);
  
  // Real-time validation checks for disable state. Only required fields need to be non-empty and valid.
  const isValid = 
    form.name.trim() !== '' && 
    form.username.trim() !== '' && 
    form.email.trim() !== '' && 
    form.password !== '' && 
    Object.keys(errors).length === 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setApiError('');
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.phone.trim()) {
        delete payload.phone;
      }
      const res = await api.post('/register', payload);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        const firstKey = Object.keys(apiErrors)[0];
        setApiError(apiErrors[firstKey][0]);
      } else {
        setApiError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Mini Wallet</h1>
        <p className="auth-subtitle">Buat akun baru</p>

        {apiError && <div className="alert alert-error">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama</label>
            <input
              type="text"
              name="name"
              className={`form-input ${form.name && errors.name ? 'input-error' : ''}`}
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              required
            />
            {form.name && errors.name && <p className="input-hint">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className={`form-input ${form.username && errors.username ? 'input-error' : ''}`}
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            {form.username && errors.username && <p className="input-hint">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-input ${form.email && errors.email ? 'input-error' : ''}`}
              value={form.email}
              onChange={handleChange}
              placeholder="email@contoh.com"
              required
            />
            {form.email && errors.email && <p className="input-hint">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-input ${form.password && errors.password ? 'input-error' : ''}`}
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 8 karakter"
              required
            />
            {form.password && errors.password && <p className="input-hint">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Nomor HP (Opsional)</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
              placeholder="08xxxxxxxx"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !isValid}
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1rem' }}>
          <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>
            Sudah punya akun? Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
