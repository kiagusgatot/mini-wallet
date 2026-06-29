import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinApi } from '../services/api';
import Numpad from '../components/Numpad';
import PageLayout from '../components/PageLayout';

export default function CreatePinPage() {
  const navigate = useNavigate();
  
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    const submitPin = async () => {
      setError('');
      setLoading(true);
      try {
        await pinApi.createPin(pin);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
        setPin('');
      } finally {
        setLoading(false);
      }
    };

    if (pin.length === 6) {
      submitPin();
    }
  }, [pin, navigate]);

  return (
    <PageLayout
      title="Buat PIN"
      subtitle="Buat PIN 6 digit untuk keamanan akun"
      showBack={false}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'var(--space-xl)',
      }}>
        {error && <div className="alert-error" style={{ width: '100%' }}>{error}</div>}

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
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-md)',
            fontSize: 'var(--text-sm)',
          }}>
            Menyimpan PIN...
          </p>
        )}

        <Numpad onKeyPress={handlePinPress} onDelete={handlePinDelete} />
      </div>
    </PageLayout>
  );
}
