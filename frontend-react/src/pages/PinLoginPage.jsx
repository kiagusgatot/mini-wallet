import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Numpad from '../components/Numpad';
import PageLayout from '../components/PageLayout';

export default function PinLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(null);

  useEffect(() => {
    if (blockedUntil) {
      const now = Date.now();
      if (now < blockedUntil) {
        const timer = setTimeout(() => {
          setBlockedUntil(null);
          setAttempts(0);
          setError('');
        }, blockedUntil - now);
        return () => clearTimeout(timer);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBlockedUntil(null);
        setAttempts(0);
        setError('');
      }
    }
  }, [blockedUntil]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('login_email');
    if (savedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(savedEmail);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePinPress = (num) => {
    if (blockedUntil) {
      setError('Terlalu banyak percobaan. Coba lagi dalam 30 detik');
      return;
    }
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
    const submitLogin = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await pinApi.loginWithPin(email, pin);
        login(res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user || {}));
        navigate('/dashboard');
      } catch (err) {
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes('pin') || errorMsg.includes('salah') || errorMsg.includes('sesi')) {
          setError('PIN yang kamu masukkan salah');
        } else if (errorMsg.includes('tidak terdaftar') || errorMsg.includes('tidak ditemukan')) {
          setError('Akun tidak ditemukan');
        } else if (errorMsg.includes('server') || errorMsg.includes('500')) {
          setError('Server bermasalah, coba lagi nanti');
        } else if (errorMsg.includes('koneksi') || errorMsg.includes('internet')) {
          setError('Tidak ada koneksi internet');
        } else {
          setError('PIN yang kamu masukkan salah');
        }
        
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setBlockedUntil(Date.now() + 30000);
          setError('Terlalu banyak percobaan. Coba lagi dalam 30 detik');
        }
        
        setPin('');
      } finally {
        setLoading(false);
      }
    };

    if (pin.length === 6 && email) {
      submitLogin();
    }
  }, [pin, email, attempts, login, navigate]);

  const switchAccount = () => {
    localStorage.removeItem('login_email');
    navigate('/login');
  };

  return (
    <PageLayout
      title="Masukkan PIN"
      subtitle="Masukkan PIN 6 digit kamu"
      showBack={true}
      backTo="/login"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'var(--space-lg)',
      }}>
        {error && <div className="alert-error" style={{ width: '100%' }}>{error}</div>}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-lg)',
        }}>
          <span style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}>
            {email}
          </span>
          <button
            onClick={switchAccount}
            style={{
              background: 'none',
              color: 'var(--color-primary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
            }}
          >
            Ganti Akun
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'center',
          marginBottom: 'var(--space-xl)',
        }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{
              display: 'block',
              width: '14px',
              height: '14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: i < pin.length ? 'var(--color-primary)' : 'transparent',
              border: '2px solid var(--color-primary)',
              transition: 'background-color 0.15s ease',
            }} />
          ))}
        </div>

        {loading && (
          <p style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-md)',
            fontSize: 'var(--text-sm)',
          }}>
            Memverifikasi...
          </p>
        )}

        <Numpad onKeyPress={handlePinPress} onDelete={handlePinDelete} />
      </div>
    </PageLayout>
  );
}
