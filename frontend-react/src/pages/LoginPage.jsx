import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pinApi } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';

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
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--space-sm)',
        }}>
          Mini Wallet
        </h1>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
        }}>
          Masukkan email untuk melanjutkan
        </p>
      </div>

      {error && <div className="alert-error">{error}</div>}

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
