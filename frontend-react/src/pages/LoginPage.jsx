import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pinApi } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';

import logoUrl from '../assets/logo.svg';

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
      const res = await pinApi.getPinStatus(email);
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 var(--app-padding-x)',
      background: 'var(--color-bg)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', justifyContent: 'center' }}>
        <img src={logoUrl} alt="Yatra Pay Logo" style={{ height: '96px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ marginBottom: 'var(--space-md)' }}>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-semibold)',
          textAlign: 'left',
          margin: 0
        }}>
          Masukkan email untuk melanjutkan
        </p>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: 'var(--space-md)' }}>{error}</div>}

      <form onSubmit={submitEmail}>
        <Card style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ marginBottom: 'var(--space-sm)' }}>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-sm)',
            }}>
              Alamat Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="contoh@email.com"
              required
            />
          </div>
        </Card>
        
        <Button
          type="submit"
          disabled={!email}
          loading={loading}
        >
          Lanjut
        </Button>

        <p style={{
          textAlign: 'center',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          marginTop: 'var(--space-lg)',
        }}>
          Belum punya akun?{' '}
          <Link to="/register" style={{
            color: 'var(--color-primary)',
            fontWeight: 'var(--font-semibold)',
            textDecoration: 'none',
          }}>
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
}
