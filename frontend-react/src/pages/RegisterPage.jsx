import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Card from '../components/Card';

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

  const isValid = form.name && form.username && form.email && form.password.length >= 6;

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
      localStorage.setItem('user', JSON.stringify(res.data.user || {}));
      navigate('/create-pin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Nama Lengkap', required: true },
    { name: 'username', type: 'text', placeholder: 'Username', required: true },
    { name: 'email', type: 'email', placeholder: 'contoh@email.com', required: true },
    { name: 'phone', type: 'text', placeholder: 'Nomor HP (Opsional)', required: false },
    { name: 'password', type: 'password', placeholder: 'Password (min 6 karakter)', required: true },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'var(--space-xl) var(--app-padding-x)',
      background: 'var(--color-bg)',
    }}>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--space-xs)',
        }}>
          Buat Akun
        </h1>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
        }}>
          Daftar untuk mulai bertransaksi
        </p>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Card style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-medium)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-xs)',
                }}>
                  {field.placeholder.replace(' (Opsional)', '').replace(' (min 6 karakter)', '')}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}
          </div>
        </Card>

        <Button
          type="submit"
          disabled={!isValid}
          loading={loading}
        >
          Daftar Sekarang
        </Button>
      </form>

      <p style={{
        textAlign: 'center',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-secondary)',
        marginTop: 'var(--space-lg)',
      }}>
        Sudah punya akun?{' '}
        <Link to="/" style={{
          color: 'var(--color-primary)',
          fontWeight: 'var(--font-semibold)',
          textDecoration: 'none',
        }}>
          Masuk
        </Link>
      </p>
    </div>
  );
}
